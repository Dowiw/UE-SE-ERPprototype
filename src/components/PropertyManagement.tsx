import { useState } from 'react';
import { User } from '../App';
import { Home, Plus, Edit2, Trash2, DollarSign, Image, FileText, AlertTriangle, Filter, Eye, Mail } from 'lucide-react';
import nycApartment from '../assets/nyc-apartment.jpg'
import house from '../assets/house.jpg'
import condo from '../assets/condo.jpg'
import apartment2 from '../assets/apartment2.jpg'

interface Property {
  id: string;
  address: string;
  type: string;
  status: 'Active' | 'Inactive' | 'Sold';
  value: number;
  photos: number;
  imageUrl: string;
}

interface PropertyManagementProps {
  user: User;
}

export function PropertyManagement({ user }: PropertyManagementProps) {
  const [properties, setProperties] = useState<Property[]>([
    { id: '1', address: '123 Main St, New York', imageUrl: nycApartment, type: 'Apartment', status: 'Active', value: 450000, photos: 5 },
    { id: '2', address: '456 Oak Ave, Boston', imageUrl: house, type: 'House', status: 'Active', value: 750000, photos: 8 },
    { id: '3', address: '789 Pine Rd, Chicago', imageUrl: condo, type: 'Condo', status: 'Sold', value: 320000, photos: 4 },
    { id: '4', address: '321 Elm St, Seattle', imageUrl: apartment2, type: 'Apartment', status: 'Inactive', value: 520000, photos: 6 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [detailTab, setDetailTab] = useState<'info' | 'photos' | 'financial'>('info');
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState<'edit' | 'new'>('edit');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [newProperty, setNewProperty] = useState({
    address: '',
    type: 'Apartment',
    status: 'Active' as const,
    value: 0,
    photos: 0,
    imageUrl: ''
  });

  const [requestMessage, setRequestMessage] = useState('');

  // Agent has READ-ONLY access, Manager has full access
  const isReadOnly = user.role === 'Agent';
  const canEdit = user.role === 'Manager';
  const canViewFinancial = user.role === 'Accountant' || user.role === 'Manager';

  const handleAddProperty = () => {
    const property: Property = {
      id: Date.now().toString(),
      ...newProperty
    };
    setProperties([...properties, property]);
    setShowAddModal(false);
    setNewProperty({ address: '', imageUrl: '', type: 'Apartment', status: 'Active', value: 0, photos: 0 });
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setShowDetailModal(true);
    setDetailTab('info');
  };

  const handleRequestEdit = (property: Property) => {
    setSelectedProperty(property);
    setRequestType('edit');
    setShowRequestModal(true);
  };

  const handleRequestNew = () => {
    setRequestType('new');
    setShowRequestModal(true);
  };

  const handleSendRequest = () => {
    // Simulate sending email request
    setShowRequestModal(false);
    setRequestMessage('');
    alert('Request sent to Manager successfully!');
  };

  const filteredProperties = filterStatus === 'all'
    ? properties
    : properties.filter(p => p.status.toLowerCase() === filterStatus);

  return (
    <div>
      {/* READ-ONLY Notice for Agents */}
      {isReadOnly && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">View-Only Access</p>
              <p className="text-sm text-yellow-800 mt-1">
                Property Agents have read-only access per UC0002. To request changes, use "Request Edit" button or contact your Manager.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isReadOnly ? 'View Properties' : 'Property Management'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isReadOnly && 'Read-Only Access - View Properties and Details'}
            {user.role === 'Accountant' && 'View-Only Financial Access'}
            {user.role === 'Manager' && 'Full Access + Analytics'}
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              aria-label="Filter properties by status"
            >
              <option value="all">All Properties</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          {/* Add Property Button - Only for Manager */}
          {canEdit && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </button>
          )}

          {/* Request New Listing for Agents */}
          {isReadOnly && (
            <button
              onClick={handleRequestNew}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Request New Listing
            </button>
          )}
        </div>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all ${
              isReadOnly
                ? 'opacity-90 cursor-pointer hover:shadow-md'
                : 'hover:shadow-xl cursor-pointer'
            }`}
            onClick={() => handleViewDetails(property)}
            title={isReadOnly ? 'Property Agents have view-only access per UC0002' : 'Click to view details'}
          >
            {/* View Only Badge */}
            {isReadOnly && (
              <div className="absolute top-2 right-2 z-10">
                <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded shadow-md">
                  VIEW ONLY
                </span>
              </div>
            )}

            {/* Images of Cards */}
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* 16:9 */ }}>
            <img
              src={property.imageUrl}
              alt={property.address}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: '0.5rem',
                borderTopRightRadius: '0.5rem'
              }}
              />
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">{property.address}</h3>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {property.type}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${
                  property.status === 'Active' ? 'bg-green-100 text-green-800' :
                  property.status === 'Sold' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {property.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${property.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Image className="w-4 h-4" />
                  <span>{property.photos} photos</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* View Details - Available for all */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(property);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>

                {/* Manager: Edit & Delete */}
                {canEdit && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProperty(property);
                        setShowAddModal(true);
                      }}
                      className="px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                      title="Edit property"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProperty(property.id);
                      }}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                      title="Delete property"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Agent: Request Edit */}
                {isReadOnly && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequestEdit(property);
                    }}
                    className="px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors flex items-center gap-1"
                    title="Request edit from Manager"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No properties found with the selected filter.</p>
        </div>
      )}

      {/* Add/Edit Property Modal - Only for Manager */}
      {showAddModal && canEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedProperty ? 'Edit Property' : 'Add New Property'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={newProperty.address}
                  onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter property address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newProperty.type}
                    onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newProperty.status}
                    onChange={(e) => setNewProperty({ ...newProperty, status: e.target.value as 'Active' | 'Inactive' | 'Sold' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value ($)</label>
                  <input
                    type="number"
                    value={newProperty.value}
                    onChange={(e) => setNewProperty({ ...newProperty, value: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Photos</label>
                  <input
                    type="number"
                    value={newProperty.photos}
                    onChange={(e) => setNewProperty({ ...newProperty, photos: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedProperty(null);
                  setNewProperty({ address: '', type: 'Apartment', imageUrl: '', status: 'Active', value: 0, photos: 0 });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProperty}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {selectedProperty ? 'Update Property' : 'Add Property'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Property Detail Modal - READ-ONLY for Agents */}
      {showDetailModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.address}</h2>
                {isReadOnly && (
                  <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded">
                    VIEW ONLY
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex gap-4">
                  <button
                    onClick={() => setDetailTab('info')}
                    className={`px-4 py-2 border-b-2 transition-colors ${
                      detailTab === 'info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Info
                  </button>
                  <button
                    onClick={() => setDetailTab('photos')}
                    className={`px-4 py-2 border-b-2 transition-colors ${
                      detailTab === 'photos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
                    }`}
                  >
                    <Image className="w-4 h-4 inline mr-2" />
                    Photos
                  </button>
                  <button
                    onClick={() => setDetailTab('financial')}
                    className={`px-4 py-2 border-b-2 transition-colors ${
                      detailTab === 'financial' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
                    }`}
                  >
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Financial Records
                  </button>
                </nav>
              </div>

              {/* Info Tab - READ-ONLY */}
              {detailTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium text-lg">{selectedProperty.type}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-medium text-lg">{selectedProperty.status}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Value</p>
                      <p className="font-medium text-lg">${selectedProperty.value.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Photos</p>
                      <p className="font-medium text-lg">{selectedProperty.photos} available</p>
                    </div>
                  </div>

                  {isReadOnly && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> This is a read-only view. To request changes, click "Request Edit" button.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Photos Tab - READ-ONLY */}
              {detailTab === 'photos' && (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Array.from({ length: selectedProperty.photos }).map((_, i) => (
                      <div key={i} className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <Image className="w-12 h-12 text-white opacity-50" />
                      </div>
                    ))}
                  </div>
                  {isReadOnly && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Photos are view-only. Contact your Manager to upload or modify images.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Financial Tab */}
              {detailTab === 'financial' && (
                <div className="space-y-4">
                  {canViewFinancial || !isReadOnly ? (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Purchase Price</p>
                          <p className="text-xl font-bold">${selectedProperty.value.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Monthly Revenue</p>
                          <p className="text-xl font-bold">$2,500</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-600">Annual ROI</p>
                          <p className="text-xl font-bold">6.7%</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-semibold mb-3">Recent Transactions</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between p-3 bg-gray-50 rounded">
                            <span>Rent Payment - January 2026</span>
                            <span className="font-medium text-green-600">+$2,500</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50 rounded">
                            <span>Maintenance - December 2025</span>
                            <span className="font-medium text-red-600">-$450</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                      <p className="text-gray-600">You don't have permission to view financial records.</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedProperty(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>

                {isReadOnly && (
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleRequestEdit(selectedProperty);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Request Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Edit/New Modal - For Agents */}
      {showRequestModal && isReadOnly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {requestType === 'edit' ? 'Request Property Edit' : 'Request New Listing'}
            </h2>

            <div className="mb-6">
              {requestType === 'edit' && selectedProperty && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Property:</strong> {selectedProperty.address}
                  </p>
                </div>
              )}

              <p className="text-gray-600 mb-4">
                Send a request to your Manager to {requestType === 'edit' ? 'edit this property' : 'add a new property listing'}.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to Manager
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Describe the changes you'd like to request..."
                />
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>To:</strong> manager@amgroup.com<br />
                  <strong>From:</strong> {user.email}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestMessage('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
