// CarePing Twilio Integration
// Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER to .env

interface TwilioConfig { accountSid: string; authToken: string; fromPhone: string; }

function getTwilioConfig(): TwilioConfig | null {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) return null;
  return { accountSid: TWILIO_ACCOUNT_SID, authToken: TWILIO_AUTH_TOKEN, fromPhone: TWILIO_PHONE_NUMBER };
}

async function twilioPost(config: TwilioConfig, body: URLSearchParams): Promise<boolean> {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`;
  const auth = 'Basic ' + Buffer.from(`${config.accountSid}:${config.authToken}`).toString('base64');
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Authorization': auth, 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
    return res.ok;
  } catch { return false; }
}

export async function sendCheckInSMS(toPhone: string, recipientName: string): Promise<boolean> {
  const config = getTwilioConfig();
  if (!config) { console.log('[CarePing] Twilio not configured — SMS skipped'); return false; }
  const msg = `Hi ${recipientName}! This is your CarePing check-in. Reply 1 if you're okay, or reply 2 if you'd like someone to call you. 💙`;
  return twilioPost(config, new URLSearchParams({ To: toPhone, From: config.fromPhone, Body: msg }));
}

export async function sendMedicationReminder(toPhone: string, recipientName: string, medicationName: string): Promise<boolean> {
  const config = getTwilioConfig();
  if (!config) { console.log('[CarePing] Twilio not configured — SMS skipped'); return false; }
  const msg = `Hi ${recipientName}! CarePing reminder: time to take your ${medicationName}. Reply DONE when taken, or SKIP to skip. 💊`;
  return twilioPost(config, new URLSearchParams({ To: toPhone, From: config.fromPhone, Body: msg }));
}

export async function sendCaregiverAlert(toPhone: string, message: string): Promise<boolean> {
  const config = getTwilioConfig();
  if (!config) { console.log('[CarePing] Twilio not configured — alert SMS skipped'); return false; }
  return twilioPost(config, new URLSearchParams({ To: toPhone, From: config.fromPhone, Body: `[CarePing Alert] ${message}` }));
}
