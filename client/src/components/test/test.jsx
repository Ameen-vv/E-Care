import { useState } from "react";

const CardSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerPage = 4;

  const slideCount = Math.ceil(departments.length / slidesPerPage);
  const slides = Array.from({ length: slideCount + 2 }, (_, i) => {
    if (i === 0) {
      return slideCount - 1;
    } else if (i === slideCount + 1) {
      return 0;
    } else {
      return i - 1;
    }
  });

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (slideCount + 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount + 2) % (slideCount + 2));
  };

  const renderDepartmentCard = (department) => {
    return (
      <div
        key={department.name}
        className="w-full sm:w-1/2 md:w-1/4 p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-200 rounded-md"
      >
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-medium mb-2">{department.name}</h3>
        <ul className="text-sm text-gray-600">
          {department.diseases.map((disease, index) => (
            <li key={index}>{disease}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex overflow-x-auto">
        {slides.map((slideIndex) => (
          <div
            key={slideIndex}
            className={`w-full flex-shrink-0 flex ${
              currentSlide === slideIndex ? "" : "hidden"
            }`}
          >
            {departments
              .slice(
                (slideIndex - 1) * slidesPerPage,
                (slideIndex - 1) * slidesPerPage + slidesPerPage
              )
              .map((department) => renderDepartmentCard(department))}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4">
        {slides.map((slideIndex) => (
          <button
            key={slideIndex}
            className={`mx-1 rounded-full w-3 h-3 ${
              currentSlide === slideIndex
                ? "bg-indigo-500"
                : "bg-gray-300"
            }`}
            onClick={() => goToSlide(slideIndex)}
          ></button>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          className="px-2 py-1 bg-white text-gray-800 rounded-l-full shadow-md hover:bg-gray-100"
          onClick={prevSlide}
        >
          &lt;
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          className="px-2 py-1 bg-white text-gray-800 rounded-r-full shadow-md hover:bg-gray-100" onClick={nextSlide}
          >
            &gt;
          </button>
        </div>
      </div>
      );
      };
      
      export default CardSlider



    



const departments = [
  {
    name: 'Cardiology',
    image: 'https://source.unsplash.com/_A7H_L2NQKk/400x225',
    diseases: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmia'],
  },
  {
    name: 'Oncology',
    image: 'https://source.unsplash.com/YeZqC_8Wz98/400x225',
    diseases: ['Breast Cancer', 'Lung Cancer', 'Prostate Cancer'],
  },
  {
    name: 'Neurology',
    image: 'https://source.unsplash.com/fjICGzXZQzU/400x225',
    diseases: ['Stroke', 'Alzheimer’s Disease', 'Epilepsy'],
  },
  {
    name: 'Orthopedics',
    image: 'https://source.unsplash.com/hSx1GD4KdNU/400x225',
    diseases: ['Arthritis', 'Fractures', 'Joint Injuries'],
  },
  {
    name: 'Gastroenterology',
    image: 'https://source.unsplash.com/fZCMvYj8B1o/400x225',
    diseases: ['Irritable Bowel Syndrome', 'Celiac Disease', 'Crohn’s Disease'],
  },
  {
    name: 'Dermatology',
    image: 'https://source.unsplash.com/_o8xVxkbJFg/400x225',
    diseases: ['Acne', 'Eczema', 'Psoriasis'],
  },
];