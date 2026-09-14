const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행중' },
  { key: 'completed', label: '완료' },
]

export default function TodoFilter({ filter, onChange }) {
  return (
    <div className="todo-filter">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={filter === key ? 'active' : ''}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
