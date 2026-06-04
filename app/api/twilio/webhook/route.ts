import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  let from = '';
  let body = '';

  const contentType = req.headers.get('content-type') ?? '';
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await req.text();
    const params = new URLSearchParams(text);
    from = params.get('From') ?? '';
    body = (params.get('Body') ?? '').trim().toLowerCase();
  } else {
    const json = await req.json().catch(() => ({}));
    from = json.From ?? '';
    body = (json.Body ?? '').trim().toLowerCase();
  }

  const now = new Date().toISOString();
  let twimlMessage = 'Thanks for your message. The CarePing team has been notified.';

  if (body === '1' || body === 'yes' || body === 'ok' || body === 'okay') {
    // Log check-in
    db.prepare("INSERT INTO care_log (recipient_id, member_name, type, title, notes, logged_at) VALUES (1, 'CarePing SMS', 'checkin', 'Daily check-in completed', ?, ?)"
    ).run(`Replied \"${body}\" via SMS from ${from}`, now);
    twimlMessage = 'Got it! 💙 Your family has been notified that you\'re doing well. Have a wonderful day!';

  } else if (body === '2' || body === 'call' || body === 'help') {
    // Create alert requesting a call
    db.prepare('INSERT INTO alerts (recipient_id, type, description, severity, created_at) VALUES (1, ?, ?, ?, ?)'
    ).run('elder_requested_call', `Elder requested a call back (SMS from ${from})`, 'high', now);
    db.prepare("INSERT INTO care_log (recipient_id, member_name, type, title, notes, logged_at) VALUES (1, 'CarePing SMS', 'alert', 'Call requested via SMS', ?, ?)"
    ).run(`Replied \"${body}\" — caregiver call requested from ${from}`, now);
    twimlMessage = 'We\'ve notified your family that you\'d like a call. Someone will reach out to you shortly. 📞';

  } else if (body === 'done' || body === 'taken' || body === 'took it') {
    // Log medication taken
    db.prepare("INSERT INTO care_log (recipient_id, member_name, type, title, notes, logged_at) VALUES (1, 'CarePing SMS', 'medication', 'Medication confirmed via SMS', ?, ?)"
    ).run(`Replied \"${body}\" via SMS from ${from}`, now);
    twimlMessage = 'Great job! 💊 Your medication has been logged as taken. Keep up the good work!';

  } else if (body === 'skip' || body === 'skipped') {
    db.prepare("INSERT INTO care_log (recipient_id, member_name, type, title, notes, logged_at) VALUES (1, 'CarePing SMS', 'medication', 'Medication skipped via SMS', ?, ?)"
    ).run(`Replied \"${body}\" via SMS from ${from}`, now);
    twimlMessage = 'Noted — medication skipped this time. Remember to let your doctor know if you skip often.';
  }

  // Return TwiML response
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${twimlMessage}</Message>
</Response>`;

  return new NextResponse(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  });
}
