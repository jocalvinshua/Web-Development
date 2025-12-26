import { Package, AlertTriangle, TrendingUp } from "lucide-react"
import '../style.css'


export default function StatsCard({ totalItems,lowStockItems,outStockItems }){

    const stats = [
        {
            title:"Total Items",
            icon: Package,
            color: 'text-blue-600',
            value: totalItems,
            bgColor: "bg-blue-50"
        },
        {
            title: 'Low Stock',
            icon: AlertTriangle,
            color: 'text-yellow-600',
            value: lowStockItems,
            bgColor: 'bg-yellow-50'
        },
        {
            title: 'Out of Stock',
            icon: TrendingUp,
            color: 'text-red-600',
            value: outStockItems,
            bgColor: 'bg-red-50'
        }
    ]



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${stat.changeColor}`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );}