import { useState } from 'react';

export default function TermsModal({ isOpen, onClose, onAgree }) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const handleAgree = () => {
    if (agreedToTerms && agreedToPrivacy) {
      onAgree();
      setAgreedToTerms(false);
      setAgreedToPrivacy(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#650404] text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Terms & Conditions and Privacy Policy</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:bg-[#4a0202] w-8 h-8 flex items-center justify-center rounded"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-gray-700 space-y-6">
          {/* Terms & Conditions */}
          <section>
            <h3 className="text-xl font-bold text-black mb-3">Terms & Conditions</h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>1. Acceptance of Terms</strong><br/>
                By registering and using our platform, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use our services.
              </p>
              <p>
                <strong>2. User Responsibilities</strong><br/>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              <p>
                <strong>3. Product and Service Usage</strong><br/>
                Our industrial storage and safety products are designed for commercial and industrial use. Users must comply with all applicable laws and regulations in their jurisdiction when using these products.
              </p>
              <p>
                <strong>4. Limitation of Liability</strong><br/>
                In no event shall our company be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our platform or products.
              </p>
              <p>
                <strong>5. Intellectual Property Rights</strong><br/>
                All content on our platform, including text, graphics, logos, and images, are the property of our company and protected by copyright laws.
              </p>
              <p>
                <strong>6. Modifications to Terms</strong><br/>
                We reserve the right to modify these Terms & Conditions at any time. Your continued use of our services constitutes acceptance of any modified terms.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section>
            <h3 className="text-xl font-bold text-black mb-3">Privacy Policy</h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>1. Information Collection</strong><br/>
                We collect information you voluntarily provide, such as your name, email, phone number, and username during the registration process.
              </p>
              <p>
                <strong>2. Use of Information</strong><br/>
                Your information is used to provide services, communicate with you, process transactions, and improve our platform. We do not sell your personal information to third parties.
              </p>
              <p>
                <strong>3. Data Security</strong><br/>
                We implement industry-standard security measures to protect your personal information. However, no online transmission is completely secure.
              </p>
              <p>
                <strong>4. Cookies</strong><br/>
                Our platform uses cookies to enhance your experience. You can disable cookies in your browser settings, though this may affect platform functionality.
              </p>
              <p>
                <strong>5. Third-Party Links</strong><br/>
                Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
              </p>
              <p>
                <strong>6. Your Rights</strong><br/>
                You have the right to access, modify, or delete your personal information. Contact us at privacy@company.com for any data-related requests.
              </p>
              <p>
                <strong>7. Contact Us</strong><br/>
                If you have questions about our Privacy Policy, please contact us at support@company.com
              </p>
            </div>
          </section>
        </div>

        {/* Footer - Checkboxes and Buttons */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-300 p-6 space-y-4">
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#650404] cursor-pointer"
              />
              <span className="text-black text-sm">
                I have read and agree to the <strong>Terms & Conditions</strong>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPrivacy}
                onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#650404] cursor-pointer"
              />
              <span className="text-black text-sm">
                I have read and agree to the <strong>Privacy Policy</strong>
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAgree}
              disabled={!agreedToTerms || !agreedToPrivacy}
              className="flex-1 bg-[#650404] hover:bg-[#4a0202] text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              I Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
