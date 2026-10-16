function StatsCards() {
  const stats = [
    {
      title: "Total Notes",
      value: "1,250",
    },
    {
      title: "Courses",
      value: "45",
    },
    {
      title: "Contributors",
      value: "320",
    },
    {
      title: "Downloads",
      value: "12,500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-slate-500 text-sm">
            {item.title}
          </h3>

          <p className="text-3xl font-bold mt-2 text-slate-800">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;