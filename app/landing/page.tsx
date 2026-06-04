import Link from 'next/link';
import { Heart, CheckCircle, Bell, Pill, Users, ClipboardList, MessageCircle, Phone, Star, ArrowRight } from 'lucide-react';

const FEATURES = [
  { icon: CheckCircle, title: 'Daily Check-ins via SMS or Call', desc: 'A simple morning message: \'Are you okay today?\' One reply keeps the whole family in the loop.' },
  { icon: Pill, title: 'Medication Reminders', desc: 'Timely reminders for every medication. Log doses right from a text message reply.' },
  { icon: Bell, title: 'Missed Check-in Alerts', desc: 'If Mom doesn\'t respond, CarePing notifies the right people right away — no one has to wonder.' },
  { icon: Users, title: 'Shared Family Dashboard', desc: 'Every sibling, every caregiver sees the same real-time picture. No more out-of-the-loop family members.' },
  { icon: ClipboardList, title: 'Care Log & History', desc: 'Track moods, meals, vitals, appointments, and notes. A complete picture for doctors and family alike.' },
  { icon: MessageCircle, title: 'AI Caregiver Assistant', desc: 'Ask anything: medication interactions, when to call 911, caregiver burnout. Expert guidance, 24/7.' },
];

const STEPS = [
  { num: '1', title: 'Set up in 5 minutes', desc: 'Create a profile for your loved one, add their medications, and invite family members to join the care circle.', icon: Users },
  { num: '2', title: 'Daily check-ins, automatically', desc: 'Every morning, your loved one gets a simple text or call: \'Are you okay today?\' They reply with a single digit.', icon: Phone },
  { num: '3', title: 'Family stays informed', desc: 'Caregivers see real-time check-in status, medication logs, and alerts on their dashboard — from anywhere.', icon: CheckCircle },
];

const TESTIMONIALS = [
  { name: 'Jennifer K., daughter', location: 'Austin, TX', quote: 'I used to call Mom three times a day just to make sure she was okay. CarePing gives me that reassurance automatically. Now I call her just to chat — which is so much better.', rating: 5 },
  { name: 'Michael T., son', location: 'Chicago, IL', quote: 'My sister and I live in different states and we were always out of sync about Dad\'s care. CarePing\'s shared dashboard changed everything. We finally feel like a team.', rating: 5 },
  { name: 'Sandra R., daughter', location: 'Phoenix, AZ', quote: 'Mom is 84 and doesn\'t use a smartphone. CarePing works through simple text messages, so she doesn\'t need to learn anything new. It\'s perfect for our family.', rating: 5 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">CarePing</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Sign In</Link>
            <Link href="/login" className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />Now in early access
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
          Is Mom okay<br /><span className="text-teal-600">today?</span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          CarePing gives elderly loved ones a simple daily check-in and gives families peace of mind — without being intrusive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-200">
            Start free 14-day trial <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#how-it-works" className="border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            See how it works
          </a>
        </div>
        <p className="text-sm text-slate-400 mt-4">No credit card required · Cancel anytime · Setup in 5 minutes</p>

        {/* Social proof */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-500">
          <div className="text-center"><p className="text-3xl font-bold text-slate-800">2,400+</p><p className="text-sm">families protected</p></div>
          <div className="hidden sm:block w-px h-12 bg-slate-200" />
          <div className="text-center"><p className="text-3xl font-bold text-slate-800">98%</p><p className="text-sm">check-in response rate</p></div>
          <div className="hidden sm:block w-px h-12 bg-slate-200" />
          <div className="text-center"><p className="text-3xl font-bold text-slate-800">4.9★</p><p className="text-sm">average family rating</p></div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How CarePing works</h2>
            <p className="text-lg text-slate-600">Get set up in minutes. Check-ins happen automatically from then on.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(step => (
              <div key={step.num} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center relative">
                <div className="w-14 h-14 rounded-full bg-teal-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-teal-100">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything your family needs</h2>
          <p className="text-lg text-slate-600">A complete care coordination platform — simple enough for Mom, powerful enough for the whole family.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(feat => (
            <div key={feat.title} className="p-6 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-100 flex items-center justify-center mb-4 transition-colors">
                <feat.icon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">{feat.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Loved by families everywhere</h2>
            <p className="text-lg text-slate-600">Real stories from adult children caring for aging parents.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex gap-0.5 mb-4">
                  {Array(t.rating).fill(null).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-400">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, honest pricing</h2>
          <p className="text-lg text-slate-600">Start free. Upgrade when you need more.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free */}
          <div className="rounded-2xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Free</h3>
            <p className="text-slate-500 text-sm mb-6">For families just getting started</p>
            <p className="text-4xl font-bold text-slate-900 mb-6">$0<span className="text-lg font-normal text-slate-400">/mo</span></p>
            <ul className="space-y-3 mb-8">
              {['1 care recipient', '1 family member', 'Basic check-ins (app only)', 'Care log (50 entries)', 'Email support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />{f}</li>
              ))}
            </ul>
            <Link href="/login" className="block text-center border border-slate-200 hover:border-teal-300 text-slate-700 font-semibold py-3 rounded-xl transition-colors">Get started free</Link>
          </div>
          {/* Family */}
          <div className="rounded-2xl border-2 border-teal-500 p-8 relative shadow-lg shadow-teal-50">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Family</h3>
            <p className="text-slate-500 text-sm mb-6">For families coordinating care together</p>
            <p className="text-4xl font-bold text-slate-900 mb-6">$19<span className="text-lg font-normal text-slate-400">/mo</span></p>
            <ul className="space-y-3 mb-8">
              {['1 care recipient', 'Unlimited family members', 'SMS check-ins', 'Medication tracking & reminders', 'Full care log & history', 'Missed check-in alerts', 'AI caregiver assistant', 'Priority support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />{f}</li>
              ))}
            </ul>
            <Link href="/login" className="block text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-colors">Start 14-day free trial</Link>
          </div>
          {/* Care Pro */}
          <div className="rounded-2xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Care Pro</h3>
            <p className="text-slate-500 text-sm mb-6">For professional caregivers and agencies</p>
            <p className="text-4xl font-bold text-slate-900 mb-6">$49<span className="text-lg font-normal text-slate-400">/mo</span></p>
            <ul className="space-y-3 mb-8">
              {['Up to 10 care recipients', 'Unlimited family members', 'SMS + voice call check-ins', 'Medication tracking & reminders', 'Full care log & history', 'Advanced alert escalation', 'Weekly summary reports', 'Dedicated support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />{f}</li>
              ))}
            </ul>
            <Link href="/login" className="block text-center border border-slate-200 hover:border-teal-300 text-slate-700 font-semibold py-3 rounded-xl transition-colors">Start 14-day free trial</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-teal-600 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Start protecting your loved one today</h2>
          <p className="text-teal-100 text-lg mb-8">Free for 14 days. No credit card required. Setup takes 5 minutes.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-10 py-4 rounded-xl text-lg hover:bg-teal-50 transition-colors shadow-xl">
            Get started free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-teal-200 text-sm mt-4">Join 2,400+ families who sleep better at night.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white">CarePing</span>
              <span className="text-slate-500 text-sm ml-2">Care. Connect. Peace of mind.</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/landing" className="hover:text-white transition-colors">Home</Link>
              <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
              <span className="text-slate-600">© {new Date().getFullYear()} CarePing</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
