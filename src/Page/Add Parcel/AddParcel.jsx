import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { ChevronDown, Package, FileText, MapPin, Phone, User, Home, Globe } from 'lucide-react';

const AddParcel = () => {
  const [parcelType, setParcelType] = useState('document');
  const [formData, setFormData] = useState({
    parcelName: '',
    parcelWeight: '',
    senderName: '',
    senderPickupHouse: '',
    senderAddress: '',
    senderContactNo: '',
    senderRegion: '',
    pickupInstruction: '',
    receiverName: '',
    receiverDeliveryHouse: '',
    receiverAddress: '',
    receiverContactNo: '',
    receiverRegion: '',
    deliveryInstruction: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCost = (type, weight, senderRegion, receiverRegion) => {
    const isSameRegion = senderRegion === receiverRegion;
    let baseCost = 0;
    let breakdown = [];

    if (type === 'document') {
      baseCost = isSameRegion ? 60 : 80;
      breakdown.push(`Base cost for document (${isSameRegion ? 'within city' : 'outside city'}): ৳${baseCost}`);
    } else {
      // Non-document
      if (isSameRegion) {
        baseCost = 110;
        breakdown.push('Base cost for non-document (within city): ৳110');
        if (weight > 3) {
          const extra = 40 * (weight - 3);
          baseCost += extra;
          breakdown.push(`Weight surcharge (৳40/kg for ${weight - 3}kg extra): ৳${extra}`);
        }
      } else {
        baseCost = 150;
        breakdown.push('Base cost for non-document (outside city): ৳150');
        if (weight > 3) {
          const extraWeight = 40 * (weight - 3);
          const extraOutside = 40;
          baseCost += extraWeight + extraOutside;
          breakdown.push(`Weight surcharge (৳40/kg for ${weight - 3}kg extra): ৳${extraWeight}`);
          breakdown.push(`Outside city extra: ৳${extraOutside}`);
        }
      }
    }

    return { cost: baseCost, breakdown };
  };

  const handleSubmit = async () => {
    // Validate form
    const requiredFields = [
      'parcelName', 'senderName', 'senderContactNo', 'senderRegion', 'senderPickupHouse', 'senderAddress',
      'receiverName', 'receiverContactNo', 'receiverRegion', 'receiverDeliveryHouse', 'receiverAddress'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (parcelType === 'non-document' && !formData.parcelWeight) {
      missingFields.push('parcelWeight');
    }

    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
      return;
    }

    // Calculate cost
    const { cost, breakdown } = calculateCost(parcelType, parseFloat(formData.parcelWeight || 0), formData.senderRegion, formData.receiverRegion);

    // Show cost and confirm
    const result = await Swal.fire({
      title: 'Delivery Cost Breakdown',
      html: `
        <div style="text-align: left; margin-bottom: 15px;">
          ${breakdown.map(item => `<p style="margin: 5px 0;">${item}</p>`).join('')}
        </div>
        <strong style="font-size: 18px; color: #2d3748;">Total Cost: ৳${cost}</strong><br><br>
        Do you want to confirm the booking?
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      // Save to database
      try {
        const parcelData = {
          ...formData,
          parcelType,
          cost,
          creation_date: new Date().toISOString()
        };

        const response = await fetch('http://localhost:5000/api/parcels', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parcelData)
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Your parcel has been booked successfully for ৳${cost}.`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error saving parcel:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save parcel. Please try again.',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r  p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-950 animate-slideDown">
              Add Parcel
            </h1>
            <p className="text-lg text-gray-700 mt-2 animate-fadeInUp">
              Enter your parcel details to proceed with booking
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            {/* Enter your parcel details */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6 animate-fadeInUp">
              Enter your parcel details
            </h2>

            {/* Parcel Info */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4 animate-fadeInUp animation-delay-100">
              Parcel Info
            </h3>

            {/* Parcel Type Toggle */}
            <div className="flex items-center gap-6 mb-8 animate-fadeInUp animation-delay-100">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="parcelType"
                  value="document"
                  checked={parcelType === 'document'}
                  onChange={(e) => setParcelType(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  parcelType === 'document' 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {parcelType === 'document' && (
                    <div className="w-2 h-2 bg-white rounded-full animate-scaleIn"></div>
                  )}
                </div>
                <span className="ml-2 text-gray-700 font-medium">Document</span>
              </label>

              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="parcelType"
                  value="non-document"
                  checked={parcelType === 'non-document'}
                  onChange={(e) => setParcelType(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  parcelType === 'non-document'
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {parcelType === 'non-document' && (
                    <div className="w-2 h-2 bg-white rounded-full animate-scaleIn"></div>
                  )}
                </div>
                <span className="ml-2 text-gray-700 font-medium">Non-Document</span>
              </label>
            </div>

            {/* Parcel Name and Weight */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="animate-fadeInUp animation-delay-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parcel Name
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="parcelName"
                    value={formData.parcelName}
                    onChange={handleInputChange}
                    placeholder="Parcel Name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                  />
                </div>
              </div>

              {parcelType === 'non-document' && (
                <div className="animate-fadeInUp animation-delay-300">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parcel Weight (KG)
                  </label>
                  <input
                    type="number"
                    name="parcelWeight"
                    value={formData.parcelWeight}
                    onChange={handleInputChange}
                    placeholder="Parcel Weight (KG)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                  />
                </div>
              )}
            </div>

            {/* Sender and Receiver Details */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sender Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 animate-fadeInUp animation-delay-400">
                  Sender Info
                </h3>

                <div className="space-y-4">
                  <div className="animate-fadeInUp animation-delay-500">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sender Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleInputChange}
                        placeholder="Sender Name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-600">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Service Center
                    </label>
                    <div className="relative">
                      <select
                        name="senderPickupHouse"
                        value={formData.senderPickupHouse}
                        onChange={handleInputChange}
                        className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 text-gray-500"
                      >
                        <option value="">Select Service Center</option>
                        <option value="center1">Service Center 1</option>
                        <option value="center2">Service Center 2</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-700">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="senderAddress"
                        value={formData.senderAddress}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-800">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sender Contact No
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="senderContactNo"
                        value={formData.senderContactNo}
                        onChange={handleInputChange}
                        placeholder="Sender Contact No"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-900">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Region
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="senderRegion"
                        value={formData.senderRegion}
                        onChange={handleInputChange}
                        className="w-full appearance-none pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 text-gray-500"
                      >
                        <option value="">Select your region</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-1000">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Instruction
                    </label>
                    <textarea
                      name="pickupInstruction"
                      value={formData.pickupInstruction}
                      onChange={handleInputChange}
                      placeholder="Pickup Instruction"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Receiver Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 animate-fadeInUp animation-delay-400">
                  Receiver Info
                </h3>

                <div className="space-y-4">
                  <div className="animate-fadeInUp animation-delay-500">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receiver Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleInputChange}
                        placeholder="Sender Name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-600">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Service Center
                    </label>
                    <div className="relative">
                      <select
                        name="receiverDeliveryHouse"
                        value={formData.receiverDeliveryHouse}
                        onChange={handleInputChange}
                        className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 text-gray-500"
                      >
                        <option value="">Select Service Center</option>
                        <option value="center1">Service Center 1</option>
                        <option value="center2">Service Center 2</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-700">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receiver Address
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="receiverAddress"
                        value={formData.receiverAddress}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-800">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receiver Contact No
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="receiverContactNo"
                        value={formData.receiverContactNo}
                        onChange={handleInputChange}
                        placeholder="Sender Contact No"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-900">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receiver Region
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="receiverRegion"
                        value={formData.receiverRegion}
                        onChange={handleInputChange}
                        className="w-full appearance-none pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 text-gray-500"
                      >
                        <option value="">Select your region</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="animate-fadeInUp animation-delay-1000">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Instruction
                    </label>
                    <textarea
                      name="deliveryInstruction"
                      value={formData.deliveryInstruction}
                      onChange={handleInputChange}
                      placeholder="Delivery Instruction"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup Time Notice */}
            <div className="mt-8 text-sm text-gray-600 animate-fadeInUp animation-delay-1100">
              * PickUp Time 4pm-7pm Approx.
            </div>

            {/* Submit Button */}
            <div className="mt-8 animate-fadeInUp animation-delay-1200">
              <button
                onClick={handleSubmit}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-gray-800 font-semibold rounded-lg hover:from-lime-500 hover:to-lime-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Proceed to Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-1100 {
          animation-delay: 1.1s;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
};

export default AddParcel;