'use client';

import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from './animations';
import { transitions } from '@/lib/animations';

type Testimonial = {
  quote: string;
  name: string;
  attribution: string;
};

type TestimonialListProps = {
  testimonials: Testimonial[];
};

const avatarColors = [
  'from-primary-400 to-primary-600',
  'from-secondary-400 to-secondary-600',
  'from-coral-400 to-coral-600',
];

export function TestimonialList({ testimonials }: TestimonialListProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" speed="slow">
      {testimonials.map((testimonial, index) => (
        <StaggerItem key={index}>
          <motion.div
            whileHover={{ y: -4, transition: transitions.spring }}
            className="bg-white rounded-2xl p-6 border border-primary-100 shadow-soft hover:shadow-large transition-shadow h-full flex flex-col"
          >
            {/* Quote mark */}
            <div className="text-5xl text-primary-200 font-serif leading-none mb-2">&ldquo;</div>

            <blockquote className="text-slate-700 leading-relaxed flex-grow">
              {testimonial.quote}
            </blockquote>

            <footer className="mt-6 flex items-center gap-3">
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}>
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{testimonial.name}</div>
                <div className="text-sm text-slate-500">{testimonial.attribution}</div>
              </div>
            </footer>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
