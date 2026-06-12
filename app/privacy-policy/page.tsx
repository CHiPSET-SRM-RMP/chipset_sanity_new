'use client'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="mb-4">
              CHiPSET (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;Company&quot;) operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information Collection and Use</h2>
            <p className="mb-4">
              We collect several different types of information for various purposes to provide and improve our website.
            </p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personal Data: Name, email address, phone number, contact form entries</li>
              <li>Usage Data: IP address, browser type, pages visited, time spent on pages, click patterns</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Use of Data</h2>
            <p className="mb-4">CHiPSET uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our website</li>
              <li>To notify you about changes to our website</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our website</li>
              <li>To monitor the usage of our website</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Advertising</h2>
            <p className="mb-4">
              Our website uses Google AdSense and other advertising partners to display advertisements. These partners may use cookies and similar technologies to collect information about your browsing activities to provide personalized advertisements.
            </p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Google DoubleClick Cookie</h3>
            <p className="mb-4">
              Google uses the DoubleClick cookie, which enables it to serve ads to users based on their visit to this website and other websites on the internet. Users may opt out of the use of the DoubleClick Cookie for interest-based advertising by visiting the Google Ads Settings page at <a href="https://www.google.com/ads/preferences/" className="text-blue-600 hover:underline">www.google.com/ads/preferences/</a>.
            </p>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Opt-Out Options</h3>
            <p className="mb-4">
              You can opt out of personalized advertising by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Visiting your <a href="https://myaccount.google.com/" className="text-blue-600 hover:underline">Google Account settings</a></li>
              <li>Using the <a href="https://www.networkadvertising.org/choices/" className="text-blue-600 hover:underline">Network Advertising Initiative&apos;s opt-out tool</a></li>
              <li>Using the <a href="https://www.google.com/ads/preferences/" className="text-blue-600 hover:underline">Google Ads Preferences Manager</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Security of Data</h2>
            <p className="mb-4">
              The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your personal data, but we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;effective date&quot; at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p><strong>Email:</strong> chipsetrmp@gmail.com</p>
              <p><strong>Website:</strong> www.chipsetsrm.live</p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
