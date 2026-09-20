import { useSiteSettings } from '../context/SiteContext';

const PrivacyPolicy = () => {
  const { settings, loading } = useSiteSettings();

  return (
    <div className="page-wrapper min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-black mb-8" style={{ color: '#1a2d6b', fontFamily: 'Poppins, sans-serif' }}>
            Privacy Policy
          </h1>
          
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>
          ) : (
            <div 
              className="prose prose-orange max-w-none text-gray-600 whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{ __html: settings.privacyPolicy || 'Privacy Policy coming soon.' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
