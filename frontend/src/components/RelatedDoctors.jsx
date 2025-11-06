import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ currentDocId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const related = doctors.filter(
    (doc) => doc.speciality === speciality && doc._id !== currentDocId
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Related Doctors
      </h2>

      {related.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((doc) => (
            <div
              key={doc._id}
              onClick={() => navigate(`/appointment/${doc._id}`)}
              className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition-all duration-500 overflow-hidden relative"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>

              {/* Doctor Image */}
              <div className="h-48 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {doc.name}
                </p>
                <p className="text-sm text-gray-500">{doc.speciality}</p>
                <button className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 shadow-md transition-all duration-300">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8 text-lg">
          No related doctors found for this speciality.
        </p>
      )}
    </div>
  );
};

export default RelatedDoctors;
