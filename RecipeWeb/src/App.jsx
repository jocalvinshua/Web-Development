import { useState } from 'react';
import './style.css'
import { Clock, Users, ChefHat, Search, ArrowLeft, UtensilsCrossed, ChevronRight } from 'lucide-react';

// Data
const cuisineData = [
  {
    id: 1,
    name: 'Homemade Margherita Pizza',
    img: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop&q=80',
    time: "45 min",
    servings: 4,
    category: "Italian",
    description: "A classic Italian pizza with fresh mozzarella, tomatoes, and basil leaves on a perfectly crispy crust.",
    ingredients: [
      "2 1/2 cups all-purpose flour",
      "1 tsp salt",
      "1 cup warm water",
      "Fresh mozzarella",
      "San Marzano tomatoes",
      "Fresh basil leaves",
      "Extra virgin olive oil"
    ],
    instructions: [
      "Mix flour, salt, and yeast in a large bowl",
      "Add warm water and knead until smooth",
      "Let dough rise for 1 hour",
      "Shape dough and add toppings",
      "Bake at 450°F for 15 minutes"
    ]
  },
  {
    id: 2,
    name: 'Classic Cheese Burger',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    time: "30 min",
    servings: 2,
    category: "American",
    description: "A juicy beef patty topped with melted cheddar cheese, fresh vegetables, and special sauce.",
    ingredients: [
      "Ground beef (80/20)",
      "Cheddar cheese",
      "Brioche buns",
      "Lettuce",
      "Tomato",
      "Red onion",
      "Special sauce"
    ],
    instructions: [
      "Form beef into patties and season",
      "Grill for 4-5 minutes per side",
      "Add cheese and let melt",
      "Toast buns until golden",
      "Assemble burger with toppings"
    ]
  },
  {
    id: 3,
    name: 'Egg Fried Rice',
    img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80',
    time: "20 min",
    servings: 2,
    category: "Asian",
    description: "Classic egg fried rice with mixed vegetables and savory soy sauce.",
    ingredients: [
      "Day-old cooked rice",
      "Eggs",
      "Mixed vegetables",
      "Soy sauce",
      "Sesame oil",
      "Green onions",
      "Garlic"
    ],
    instructions: [
      "Scramble eggs and set aside",
      "Stir-fry vegetables and garlic",
      "Add rice and break up clumps",
      "Mix in eggs and soy sauce",
      "Garnish with green onions"
    ]
  }
];

const categories = ["All", "Italian", "American", "Asian"];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = cuisineData.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ? true : recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setSearchQuery} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <div className="flex-1">
            {selectedRecipe ? (
              <RecipeDetails 
                recipe={selectedRecipe} 
                onBack={() => setSelectedRecipe(null)}
              />
            ) : (
              <RecipeList
                recipes={filteredRecipes}
                onRecipeSelect={setSelectedRecipe}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar({ onSearch }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ChefHat className="h-8 w-8 text-emerald-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">YourRecipe</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ categories, selectedCategory, onCategorySelect }) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-emerald-100 text-emerald-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {category}
            {selectedCategory === category && (
              <ChevronRight className="float-right h-5 w-5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function RecipeList({ recipes, onRecipeSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <button
          key={recipe.id}
          onClick={() => onRecipeSelect(recipe)}
          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left"
        >
          <img
            src={recipe.img}
            alt={recipe.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{recipe.description}</p>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function RecipeDetails({ recipe, onBack }) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="relative h-64">
        <img
          src={recipe.img}
          alt={recipe.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-6">{recipe.description}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UtensilsCrossed className="h-5 w-5 mr-2 text-emerald-600" />
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}