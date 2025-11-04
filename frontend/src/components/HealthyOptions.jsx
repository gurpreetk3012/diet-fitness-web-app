const cardItems = [
  { icon: "🍽️", title: "Feeling Hungry?", subtitle: "Eat Healthy" },
  { icon: "⚖️", title: "Healthy Weight", subtitle: "Management" },
  { icon: "🍏", title: "Healthy Eating", subtitle: "& Nutrition" },
  { icon: "🥗", title: "Healthy Food", subtitle: "Choices" },
];

const FeatureCards = () => {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cardItems.map((item, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center py-8 transition-transform duration-500 hover:scale-[1.02] hover:shadow-lg hover:bg-[#43cea2]/80 cursor-pointer"
          >
            <div className="text-3xl mb-3 transition-colors duration-200">{item.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center transition-colors duration-200">{item.title}</h3>
            <p className="text-gray-500 text-sm text-center transition-colors duration-200">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;