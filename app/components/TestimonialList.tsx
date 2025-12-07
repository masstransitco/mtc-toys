type Testimonial = {
  quote: string;
  name: string;
  attribution: string;
};

type TestimonialListProps = {
  testimonials: Testimonial[];
};

// TODO: Replace placeholder testimonials with real customer reviews before launch
export function TestimonialList({ testimonials }: TestimonialListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 border border-gray-100"
        >
          <blockquote className="text-gray-700 mb-4 leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <footer className="text-sm">
            <span className="font-medium text-gray-900">{testimonial.name}</span>
            <span className="text-gray-500"> — {testimonial.attribution}</span>
          </footer>
        </div>
      ))}
    </div>
  );
}
