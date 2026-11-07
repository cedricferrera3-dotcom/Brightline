// Product catalog. Photos live in /public/images (see public/images/README.md).
export const CATEGORIES = ['Kitchen', 'Laundry', 'Cooling', 'Cleaning'];

// Maps each product number to its photo in /public/images
const IMAGES = {
  1: 'stove.png',
  2: 'fridge.png',
  3: 'washer.png',
  4: 'inverter.png',
  5: 'microwave.png',
  6: 'dishwasher.png',
  7: 'mixer.png',
  8: 'vacuum.png',
  9: 'fryer.png',
  10: 'ricecooker.png', // this one is .jpg
  11: 'kettle.png',
  12: 'fan.png',
};

const p = (n, name, brand, category, price, rating, stock, description, features, badge) => ({
  id: `p${n}`,
  name, brand, category, price, rating, stock, description, features, badge,
  image: IMAGES[n],
});

export const products = [
  p(1, 'Induction Cooktop 2-Zone', 'Brightline', 'Kitchen', 8990, 4.6, 14, 'Fast, even heat with touch controls and a built-in timer.', ['2000W per zone', '9 power levels', 'Child lock'], 'Best seller'),
  p(2, 'French-Door Refrigerator 18 cu.ft.', 'Polar', 'Cooling', 54990, 4.8, 5, 'Inverter compressor with a separate freezer drawer and door alarm.', ['Inverter compressor', 'Frost-free', 'Energy rating 4-star']),
  p(3, 'Front-Load Washer 9kg', 'Aquora', 'Laundry', 32990, 4.5, 8, 'Quiet drum with 14 wash programs and a steam refresh cycle.', ['9kg capacity', '1400 rpm spin', 'Steam cycle'], 'Sale'),
  p(4, 'Inverter Split Aircon 1.5HP', 'Polar', 'Cooling', 27990, 4.7, 11, 'Cools a medium room quickly while keeping electricity use low.', ['Inverter', 'Auto-clean', 'Sleep mode']),
  p(5, 'Microwave Oven 28L', 'Brightline', 'Kitchen', 6490, 4.3, 20, 'Convection and grill modes for reheating, baking and crisping.', ['28L', 'Grill + convection', '10 auto menus']),
  p(6, 'Freestanding Dishwasher 12-Place', 'Aquora', 'Kitchen', 38990, 4.4, 4, 'Adjustable racks and a half-load option for smaller households.', ['12 place settings', 'Half-load', 'Delay start'], 'Sale'),
  p(7, 'Stand Mixer 5L', 'Brightline', 'Kitchen', 12490, 4.9, 9, 'Planetary mixing with dough hook, whisk and flat beater.', ['5L steel bowl', '10 speeds', '3 attachments'], 'Best seller'),
  p(8, 'Robot Vacuum with Mop', 'Cleanly', 'Cleaning', 15990, 4.2, 12, 'Maps your rooms and returns to the dock when it needs a charge.', ['3000Pa suction', 'App schedule', '150 min runtime']),
  p(9, 'Air Fryer 5.5L', 'Brightline', 'Kitchen', 4290, 4.6, 30, 'Crisps with little oil. The basket slides out and is dishwasher safe.', ['5.5L', '8 presets', 'Dishwasher-safe basket']),
  p(10, 'Digital Rice Cooker 1.8L', 'Hanami', 'Kitchen', 3290, 4.5, 25, 'Cooks rice, porridge and steamed dishes with a keep-warm mode.', ['1.8L', 'Keep warm 12h', 'Steam tray']),
  p(11, 'Electric Kettle 1.7L', 'Hanami', 'Kitchen', 1490, 4.4, 40, 'Boils fast and switches off automatically when done.', ['1.7L', 'Auto shut-off', 'Boil-dry protection']),
  p(12, 'Standing Fan 16"', 'Polar', 'Cooling', 1990, 4.1, 0, 'Three speeds, oscillation and a tilting head for easy airflow.', ['3 speeds', 'Oscillating', 'Tilt head']),
];

export const getProduct = (id) => products.find((x) => x.id === id);