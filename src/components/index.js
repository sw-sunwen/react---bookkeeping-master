const iconMap = {
  drinks: '🥤',
  breakfast: '🍳',
  lunch: '🍜',
  subway: '🚇',
  movie: '🎬',
  clothes: '👕',
  rent: '🏠',
  snacks: '🍿',
  fruit: '🍎',
  'water bill': '💧',
  salary: '💰',
  'electricity bill': '⚡',
  bus: '🚌',
  dinner: '🍽️',
  'part-time': '💼',
  coffee: '☕',
  fitness: '💪',
  'finance income': '📈',
  'red packet': '🧧',
  bonus: '🎁'
}

const Icon = ({ type }) => {
  return (
    <span style={{
      fontSize: 20,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20
    }}>
      {iconMap[type] || '📝'}
    </span>
  )
}

export default Icon