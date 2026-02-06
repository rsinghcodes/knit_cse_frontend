import React from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';
import { Code } from 'lucide-react';

export const CustomStylesEditor: React.FC = () => {
    const { settings, updatePartialSettings } = useSiteSettingsContext();
    const { custom } = settings;

    const handleCSSChange = (css: string) => {
        updatePartialSettings({
            custom: {
                ...custom,
                customCSS: css,
            },
        });
    };

    const handleJSChange = (js: string) => {
        updatePartialSettings({
            custom: {
                ...custom,
                customJavaScript: js,
            },
        });
    };

    return (
        <div className="space-y-8">
            {/* Custom CSS */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Custom CSS</h3>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Add custom CSS to override or extend the default styles. Your CSS will be applied globally.
                </p>

                <textarea
                    value={custom.customCSS}
                    onChange={(e) => handleCSSChange(e.target.value)}
                    placeholder={`/* Example: */
.header {
  background: linear-gradient(to right, #153d6a, #0891b2);
}

body {
  font-family: 'Poppins', sans-serif;
}`}
                    rows={15}
                    className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    spellCheck={false}
                />

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">
                        💡 CSS Tips
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Use browser DevTools to inspect elements and test styles</li>
                        <li>• Reference CSS variables: var(--primary), var(--background), etc.</li>
                        <li>• Be specific with selectors to override default styles</li>
                        <li>• Test responsiveness with media queries</li>
                        <li>• Changes apply immediately - no page refresh needed</li>
                    </ul>
                </div>
            </section>

            {/* Custom JavaScript */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Custom JavaScript</h3>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Add custom JavaScript for advanced functionality. Use with caution.
                </p>

                <textarea
                    value={custom.customJavaScript || ''}
                    onChange={(e) => handleJSChange(e.target.value)}
                    placeholder={`// Example:
console.log('Custom JavaScript loaded');

// Add custom event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Your code here
});`}
                    rows={10}
                    className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    spellCheck={false}
                />

                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-amber-900 mb-2">
                        ⚠️ JavaScript Warning
                    </h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Custom JavaScript can break your site if not used correctly</li>
                        <li>• Avoid modifying React components or core functionality</li>
                        <li>• Test thoroughly before deploying to production</li>
                        <li>• Currently disabled for safety - will be executed on save</li>
                    </ul>
                </div>
            </section>

            {/* CSS Classes Reference */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Available CSS Classes</h3>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                        <div>
                            <p className="font-semibold mb-2">Layout</p>
                            <ul className="space-y-1 text-gray-700">
                                <li>.header</li>
                                <li>.hero</li>
                                <li>.highlights-strip</li>
                                <li>.circulars</li>
                                <li>.footer</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Utility Classes</p>
                            <ul className="space-y-1 text-gray-700">
                                <li>.glass-card</li>
                                <li>.gradient-border</li>
                                <li>.hover-lift</li>
                                <li>.animate-marquee</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
