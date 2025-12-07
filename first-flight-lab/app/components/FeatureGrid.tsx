import { iconMap } from './Icons';

type Feature = {
  icon: keyof typeof iconMap;
  title: string;
  body: string;
};

type FeatureGridProps = {
  features: Feature[];
};

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature) => {
        const Icon = iconMap[feature.icon];
        return (
          <div
            key={feature.title}
            className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.body}</p>
          </div>
        );
      })}
    </div>
  );
}
