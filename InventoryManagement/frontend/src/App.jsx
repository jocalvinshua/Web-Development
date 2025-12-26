import { useState } from 'react';
import './style.css';
import Navbar from './container/Navbar.jsx';
import Header from './container/Header.jsx';
import StatsCard from './container/StatsCard.jsx';
import InventoryTable from './container/InventoryTable.jsx';
import InventoryModal from './container/InventoryModal.jsx';

export default function App() {
  const [inventory, setInventory] = useState([
    {
      id: '2',
      name: 'Gaming Mouse',
      sku: 'GM-002',
      category: 'Electronics',
      stock: 50,
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      sku: 'BS-003',
      category: 'Electronics',
      stock: 0
    },
    {
      id: '4',
      name: 'USB-C Cable',
      sku: 'UC-004',
      category: 'Accessories',
      stock: 5
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const categories = [
    { name: 'Electronics' },
    { name: 'Accessories' },
    { name: 'Stationery' }
  ];

  const getTotalItems = inventory.length;
  const getLowStockItems = inventory.filter(item => item.stock > 0 && item.stock < 10).length;
  const getOutOfStock = inventory.filter(item => item.stock === 0).length;

  // Handle add or update item
  const handleSubmitItem = (itemData) => {
    if (editItem) {
      // Update existing
      setInventory(prev =>
        prev.map(item => item.id === editItem.id ? { ...item, ...itemData } : item)
      );
    } else {
      // Add new
      const newItem = {
        ...itemData,
        id: crypto.randomUUID()
      };
      setInventory(prev => [...prev, newItem]);
    }
    setEditItem(null);
  };

  const handleAddClick = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <StatsCard
          totalItems={getTotalItems}
          lowStockItems={getLowStockItems}
          outStockItems={getOutOfStock}
        />
        <InventoryTable
          items={inventory}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
        />
      </div>

      {showModal && (
        <InventoryModal
          product={editItem}
          categories={categories}
          onClose={() => {
            setShowModal(false);
            setEditItem(null);
          }}
          onSubmit={handleSubmitItem}
        />
      )}
    </div>
  );
}
