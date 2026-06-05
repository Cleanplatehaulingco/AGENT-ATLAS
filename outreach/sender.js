/**
 * sender.js
 * SendGrid email sender with email warmup schedule for TradeOpsVault outreach.
 * Handles CAN-SPAM compliance: List-Unsubscribe header, physical address footer.
 */

const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';

const PHYSICAL_ADDRESS = 'TradeOpsVault | 123 Business Ave, Suite 100';

/**
 * Warmup schedule — daily send limits by day of warmup.
 * Gradually increases volume to build sender reputation.
 *
 * @param {number} warmupDay   1-indexed day since first send
 * @returns {number}           Maximum emails to send on this day
 */
export function getDailyLimit(warmupDay) {
  if (warmupDay <= 7) return 20;
  if (warmupDay <= 14) return 40;
  if (warmupDay <= 21) return 75;
  if (warmupDay <= 30) return 150;
  return 300;
}

/**
 * Appends a CAN-SPAM-compliant footer to a plain-text email body.
 *
 * @param {string} body           Original email body
 * @param {string} unsubscribeUrl Unsubscribe URL
 * @returns {string}              Body with footer appended
 */
function appendFooter(body, unsubscribeUrl) {
  const footer = [
    '',
    '--',
    `${PHYSICAL_ADDRESS}`,
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join('\n');
  return body + footer;
}

/**
 * Sends a single email via SendGrid v3 API.
 * Includes List-Unsubscribe header and physical address footer for CAN-SPAM compliance.
 *
 * @param {string} to              Recipient email address
 * @param {string} subject         Email subject line
 * @param {string} body            Plain-text email body (no HTML)
 * @param {string} fromEmail       Sender email address
 * @param {string} fromName        Sender display name
 * @param {string} unsubscribeUrl  URL for one-click unsubscribe
 * @param {string} apiKey          SendGrid API key
 * @returns {Promise<{ sent: boolean, messageId?: string, reason?: string }>}
 */
export async function sendEmail(to, subject, body, fromEmail, fromName, unsubscribeUrl, apiKey) {
  const bodyWithFooter = appendFooter(body, unsubscribeUrl);

  const payload = {
    personalizations: [
      {
        to: [{ email: to }],
        subject,
      },
    ],
    from: {
      email: fromEmail,
      name: fromName,
    },
    content: [
      {
        type: 'text/plain',
        value: bodyWithFooter,
      },
    ],
    headers: {
      // List-Unsubscribe for email client unsubscribe buttons
      'List-Unsubscribe': `<${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    // Tracking settings — disable open/click tracking for better deliverability
    tracking_settings: {
      click_tracking: { enable: false },
      open_tracking: { enable: false },
    },
  };

  let response;
  try {
    response = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Network-level failure
    console.error(`[sender] Network error sending to ${to}: ${err.message}`);
    return { sent: false, reason: `network_error: ${err.message}` };
  }

  // SendGrid returns 202 Accepted on success
  if (response.status === 202) {
    const messageId = response.headers.get('X-Message-Id') || null;
    return { sent: true, messageId };
  }

  // 4xx / 5xx — extract error detail and return failure
  let errorBody = '';
  try {
    const json = await response.json();
    errorBody = JSON.stringify(json.errors || json);
  } catch {
    errorBody = `HTTP ${response.status}`;
  }

  const reason = `sendgrid_${response.status}: ${errorBody}`;
  console.error(`[sender] Failed to send to ${to}: ${reason}`);
  return { sent: false, reason };
}
