export type Product = {
  id: string
  title: string
  photographer: string
  category: string
  price: number
  image: string
  orientation: 'landscape' | 'portrait' | 'square'
  tags: string[]
  description: string
}

export const categories = [
  { name: 'Nature & Landscapes', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85' },
  { name: 'Architecture & Interiors', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=85' },
  { name: 'Portraits', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85' },
  { name: 'Wildlife', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=85' },
  { name: 'Street Photography', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85' },
  { name: 'Travel', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85' },
  { name: 'Abstract & Fine Art', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85' },
  { name: 'Minimalism', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85' },
]

export const products: Product[] = [
  { id: '01', title: 'Quiet Altitudes', photographer: 'Chaitanya Kherdikar', category: 'Nature & Landscapes', price: 1800, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85', orientation: 'landscape', tags: ['mountains', 'calm', 'blue'], description: 'A study in stillness, captured above the clouds.' },
  { id: '02', title: 'After Rain', photographer: 'Sabiha Mulla', category: 'Nature & Landscapes', price: 950, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85', orientation: 'portrait', tags: ['forest', 'green', 'peaceful'], description: 'Light returning to an ancient forest after rain.' },
  { id: '03', title: 'Concrete Rhythm', photographer: 'Uves Bagwan', category: 'Architecture & Interiors', price: 2400, image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=85', orientation: 'portrait', tags: ['architecture', 'modern', 'lines'], description: 'Geometry, shadow, and the language of modern space.' },
  { id: '04', title: 'Desert Solitude', photographer: 'Chaitanya Kherdikar', category: 'Travel', price: 1200, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85', orientation: 'landscape', tags: ['desert', 'travel', 'warm'], description: 'The horizon holds its breath in the Thar.' },
  { id: '05', title: 'Tide Studies I', photographer: 'Sabiha Mulla', category: 'Abstract & Fine Art', price: 1600, image: 'https://images.unsplash.com/photo-1507525425516-65b1f6b6e8d7?auto=format&fit=crop&w=1000&q=85', orientation: 'landscape', tags: ['ocean', 'abstract', 'blue'], description: 'An elemental portrait of water in motion.' },
  { id: '06', title: 'The Red Door', photographer: 'Uves Bagwan', category: 'Street Photography', price: 780, image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=85', orientation: 'square', tags: ['street', 'color', 'urban'], description: 'A bright pause on a quiet city block.' },
  { id: '07', title: 'Wild Gaze', photographer: 'Chaitanya Kherdikar', category: 'Wildlife', price: 2100, image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=85', orientation: 'portrait', tags: ['wildlife', 'animal', 'earth'], description: 'A fleeting encounter with a watchful presence.' },
  { id: '08', title: 'Soft Portrait', photographer: 'Sabiha Mulla', category: 'Portraits', price: 1400, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85', orientation: 'portrait', tags: ['portrait', 'human', 'soft'], description: 'An intimate portrait shaped by natural window light.' },
]

export const formatINR = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
