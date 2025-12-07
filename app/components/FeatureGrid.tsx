'use client';

import { motion } from 'framer-motion';
import { iconMap } from './Icons';
import { StaggerContainer, StaggerItem } from './animations';
import { transitions } from '@/lib/animations';

type Feature = {
  icon: keyof typeof iconMap;
  title: string;
  body: string;
};

type FeatureGridProps = {
  features: Feature[];
};

const iconColors = [
  { bg: 'bg-primary-100', icon: 'text-primary-600' },
  { bg: 'bg-secondary-100', icon: 'text-secondary-600' },
  { bg: 'bg-coral-100', icon: 'text-coral-500' },
  { bg: 'bg-emerald-100', icon: 'text-emerald-600' },
];

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon];
        const colors = iconColors[index % iconColors.length];

        return (
          <StaggerItem key={feature.title}>
            <motion.div
              whileHover={{
                y: -4,
                backgroundColor: 'rgb(224 242 254)',
                transition: transitions.spring,
              }}
              className="bg-surface rounded-2xl p-6 h-full cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={transitions.springBouncy}
                className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-4`}
              >
                <Icon className={`w-7 h-7 ${colors.icon}`} />
              </motion.div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.body}</p>
            </motion.div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
