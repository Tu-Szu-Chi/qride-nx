'use client';

import React from 'react';
import Header from '$/components/Header';

export default function Privacy() {
  return (
    <div className="w-full  min-h-full flex-1">
      <style jsx>
        {`
          .content > p {
            margin-bottom: 14px;
          }
        `}
      </style>
      <Header title="Privacy Policy" />
      <div className="p-6 content">
        <p>Qlink Rider Club Membership App Privacy Policy</p>

        <p>
          At Quan Fong Li Industrial Co., Ltd. (hereinafter referred to as "the
          Company"), we are committed to protecting your privacy. This Privacy
          Policy outlines how we collect, use, and protect your personal
          information when you use the Qlink Rider Club Membership App
          (hereinafter referred to as "the App").
        </p>

        <p>1. Information We Collect</p>

        <p>1.1 Personal Information</p>

        <p>
          When you register an account or use the App, we may collect personal
          information, including but not limited to:
        </p>

        <p> • Name: For account creation and personalization.</p>
        <p>
          {' '}
          • Email Address: For communication, account recovery, and updates.
        </p>
        <p> • Phone Number: For account verification and customer support.</p>
        <p>
          {' '}
          • Address: For delivery of services and promotional materials (if
          applicable).
        </p>
        <p>
          {' '}
          • Vehicle Information: Such as your motorcycle's make, model, and
          registration details, to provide personalized services.
        </p>

        <p>1.2 Usage Data</p>

        <p>We may collect data on how you interact with the App, including:</p>

        <p>
          {' '}
          • App Usage Information: Pages visited, features used, and actions
          taken within the App.
        </p>
        <p>
          {' '}
          • Device Information: Type of device, operating system, and unique
          device identifiers.
        </p>
        <p>
          {' '}
          • Location Data: Geographical location to provide location-based
          services (if enabled).
        </p>

        <p>1.3 Cookies and Tracking Technologies</p>

        <p>
          We use cookies and similar tracking technologies to enhance your
          experience on the App. Cookies help us understand your preferences and
          provide a more personalized experience.
        </p>

        <p>2. How We Use Your Information</p>

        <p>2.1 Provide and Improve Services</p>

        <p>Your personal information is used to:</p>

        <p> • Create and manage your account.</p>
        <p>
          {' '}
          • Provide personalized services, such as tailored content and offers.
        </p>
        <p> • Improve the functionality and user experience of the App.</p>

        <p>2.2 Communication</p>

        <p>We may use your email address and phone number to:</p>

        <p> • Send you important updates and notifications about the App.</p>
        <p> • Respond to your inquiries and provide customer support.</p>
        <p>
          {' '}
          • Send promotional materials and special offers (with your consent).
        </p>

        <p>2.3 Legal Compliance</p>

        <p>
          We may disclose your information to comply with legal obligations,
          protect our rights, or respond to lawful requests from authorities.
        </p>

        <p>3. How We Share Your Information</p>

        <p>3.1 Third-Party Service Providers</p>

        <p>
          We may share your personal information with third-party service
          providers who assist us in operating the App, such as:
        </p>

        <p>
          {' '}
          • Hosting Providers: To host and manage the App's infrastructure.
        </p>
        <p>
          {' '}
          • Analytics Providers: To analyze user behavior and improve the App.
        </p>
        <p> • Payment Processors: To facilitate payments (if applicable).</p>

        <p>3.2 Legal Obligations</p>

        <p>
          We may share your information with law enforcement or other
          authorities if required by law or to protect our legal rights.
        </p>

        <p>3.3 Business Transfers</p>

        <p>
          In the event of a merger, acquisition, or sale of all or a portion of
          our assets, your personal information may be transferred to the
          acquiring entity.
        </p>

        <p>4. Data Security</p>

        <p>4.1 Security Measures</p>

        <p>
          We implement a variety of security measures to protect your personal
          information from unauthorized access, disclosure, or alteration. These
          include:
        </p>

        <p>
          {' '}
          • Encryption: We use encryption to protect sensitive data transmitted
          over the internet.
        </p>
        <p>
          {' '}
          • Access Controls: We restrict access to personal information to
          authorized personnel only.
        </p>
        <p>
          {' '}
          • Regular Audits: We conduct regular security audits to ensure our
          systems are secure.
        </p>

        <p>4.2 No Guarantee</p>

        <p>
          While we strive to protect your personal information, we cannot
          guarantee its absolute security due to the inherent risks of internet
          usage.
        </p>

        <p>5. Your Rights and Choices</p>

        <p>5.1 Access and Update</p>

        <p>
          You have the right to access and update your personal information at
          any time through your account settings.
        </p>

        <p>5.2 Opt-Out</p>

        <p>
          You can opt-out of receiving promotional emails by following the
          unsubscribe instructions in the email. You can also disable location
          tracking through your device settings.
        </p>

        <p>5.3 Data Deletion</p>

        <p>
          You may request the deletion of your account and personal information
          by contacting us. Please note that certain information may be retained
          to comply with legal obligations.
        </p>

        <p>6. Children's Privacy</p>

        <p>
          The App is not intended for use by individuals under the age of 18. We
          do not knowingly collect personal information from children under 18.
          If we become aware that we have inadvertently collected such
          information, we will take steps to delete it.
        </p>

        <p>7. International Data Transfers</p>

        <p>
          Your personal information may be transferred to and processed in
          countries other than Nigeria, where our servers or service providers
          are located. We will take steps to ensure that your information
          receives the same level of protection as it would under Nigerian law.
        </p>

        <p>8. Changes to This Privacy Policy</p>

        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted within the App, and the revised policy will take effect
          immediately upon posting. We encourage you to review this policy
          periodically to stay informed about how we are protecting your
          information.
        </p>

        <p>9. Contact Us</p>

        <p>
          If you have any questions or concerns about this Privacy Policy or how
          your information is handled, please contact us at:
        </p>

        <p> • Email: <a className='text-blue-600' href="mailto:support@quan-fong-li.com">support@quan-fong-li.com</a></p>
        <p> • Phone: +234-1-234-5678</p>

        <p>
          This Privacy Policy ensures that users are informed about how their
          personal information is collected, used, and protected. If you need
          further customization or have specific requirements, feel free to ask!
        </p>
      </div>
    </div>
  );
}
