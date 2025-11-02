import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapSection = () => {
  const [filters, setFilters] = useState({
    potholes: true,
    lights: true,
    garbage: true,
    electricity: true
  });

  const cities = [
    {
      name: 'Hyderabad',
      position: [17.3850, 78.4867],
      severity: 'high',
      issues: {
        potholes: 45,
        lights: 23,
        garbage: 34,
        electricity: 12
      }
    },
    {
      name: 'Mumbai',
      position: [19.0760, 72.8777],
      severity: 'medium',
      issues: {
        potholes: 32,
        lights: 18,
        garbage: 28,
        electricity: 8
      }
    },
    {
      name: 'Chennai',
      position: [13.0827, 80.2707],
      severity: 'high',
      issues: {
        potholes: 38,
        lights: 15,
        garbage: 42,
        electricity: 9
      }
    },
    {
      name: 'Bengaluru',
      position: [12.9716, 77.5946],
      severity: 'medium',
      issues: {
        potholes: 29,
        lights: 22,
        garbage: 19,
        electricity: 14
      }
    },
    {
      name: 'Delhi',
      position: [28.6139, 77.2090],
      severity: 'low',
      issues: {
        potholes: 18,
        lights: 12,
        garbage: 15,
        electricity: 6
      }
    },
    {
      name: 'Kolkata',
      position: [22.5726, 88.3639],
      severity: 'medium',
      issues: {
        potholes: 25,
        lights: 16,
        garbage: 31,
        electricity: 7
      }
    }
  ];

  const getMarkerColor = (severity) => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const handleFilterChange = (filter) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const shouldShowCity = (city) => {
    // In a real app, this would filter based on actual data
    // For now, we'll show all cities regardless of filters for demonstration
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">City Issues Map</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(filters).map(([key, value]) => (
          <label key={key} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleFilterChange(key)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700 capitalize">
              Show {key}
            </span>
          </label>
        ))}
      </div>

      {/* Map Container */}
      <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {cities.filter(shouldShowCity).map((city) => (
            <CircleMarker
              key={city.name}
              center={city.position}
              radius={15}
              fillColor={getMarkerColor(city.severity)}
              color={getMarkerColor(city.severity)}
              weight={2}
              opacity={1}
              fillOpacity={0.6}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">{city.name}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Potholes:</span>
                      <span className="font-medium">{city.issues.potholes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lights:</span>
                      <span className="font-medium">{city.issues.lights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Garbage:</span>
                      <span className="font-medium">{city.issues.garbage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Electricity:</span>
                      <span className="font-medium">{city.issues.electricity}</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mt-4 justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">High Issue Density</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Medium Issue Density</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Low Issue Density</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MapSection;