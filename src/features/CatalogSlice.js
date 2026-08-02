import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  banner: {
    title: "Partitions And Cages",
    description1:
      "Industrial partitions and cages are physical barriers in industrial and commercial settings to create distinct, secure areas within a larger space. They are typically constructed from sturdy materials like wire mesh and steel, providing both security and organization.",
    description2:
      "Industrial partitions and cages are durable structural solutions designed to divide, secure, and organize large industrial or commercial spaces. Built with heavy-gauge wire mesh, reinforced steel panels, and strong framing, they offer long-term reliability in demanding environments. These systems integrate seamlessly into existing facility layouts and can be expanded, relocated, or reconfigured as operational needs evolve. With multiple door options, locking systems, and customizable layouts, they provide flexible, secure, and efficient workspace management.",
    image: "/images/image-18.png",
  },
  KeyCharacteristics: [
    {
      id: 1,
      title: "Security",
      description:
        "They prevent unauthorized access to valuable inventory, tools, equipment, or sensitive areas like server rooms and hazardous material storage.",
      icon: "security",
    },
    {
      id: 2,
      title: "Organization",
      description:
        "They help streamline workflow by creating specific work zones and separating different types of processes or materials within a facility.",
      icon: "organization",
    },
    {
      id: 3,
      title: "Safety",
      description:
        "They contribute to a safer work environment by isolating hazardous areas or machinery and protecting employees from potential dangers.",
      icon: "safety",
    },
  ],
  exampleApplications: [
    {
      id: 1,
      title: "Warehouses and Distribution Centers",
      description:
        "Securing valuable inventory, creating separate storage areas, and restricting access to hazardous materials.",
      image: "/images/Rectangle-182.png",
    },
    {
      id: 2,
      title: "Manufacturing Facilities",
      description:
        "Guarding machinery, creating controlled environments for specific processes, and securing tool cribs and equipment.",
      image: "/images/Rectangle-10900.png",
    },
    {
      id: 3,
      title: "Data Centers",
      description:
        "Securing server racks and IT equipment, ensuring data protection and compliance.",
      image: "/images/Rectangle184.png",
    },
  ],
  products: [],
  activeFilter: "latest",
  searchTerm: "",
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'catalog/fetchProducts',
  async (_, thunkAPI) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api';
    const response = await fetch(`${baseUrl}/products`);
    if (!response.ok) {
      const message = await response.text();
      return thunkAPI.rejectWithValue(message || 'Failed to load products');
    }
    return response.json();
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to load products from the backend.';
      });
  },
});

export const { setFilter, setSearchTerm } = catalogSlice.actions;
export default catalogSlice.reducer;
