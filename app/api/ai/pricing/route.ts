import { NextRequest, NextResponse } from 'next/server';
import { anthropic, BUSINESS_CONTEXT } from '@/lib/anthropic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, cost_to_make, time_minutes, description, platforms } = body;

    const prompt = `Analyze pricing for this handmade product and give specific recommendations:

Product Name: ${name}
Category: ${category || 'Handmade jewelry/gift'}
Cost to Make (materials): $${cost_to_make || 0}
Time to Make: ${time_minutes || '?'} minutes
Description: ${description || 'Not provided'}
Selling Platforms: ${platforms?.join(', ') || 'Etsy, Farmers Market'}

Please provide:
1. **Recommended Price Range** - low/mid/high with reasoning
2. **Etsy-Specific Price** - accounting for Etsy fees (6.5% transaction + 3%+$0.25 payment + $0.20 listing)
3. **Market Booth Price** - for the Saturday farmers market
4. **Profit Margin Analysis** - at your recommended price
5. **Pricing Tips** - 2-3 specific suggestions for this product type

Be specific with dollar amounts. Consider craft market expectations and competition.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      system: BUSINESS_CONTEXT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ analysis: text });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: BUSINESS_CONTEXT,
      messages: [{
        role: 'user',
        content: `What handmade jewelry and gift products are trending right now for Etsy sellers and farmers market vendors? Give me 5-7 specific trending items with brief explanations of why they're popular and tips for making/selling them. Format as a clear list.`,
      }],
    });
    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ trends: text });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
