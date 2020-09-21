import React from 'react';

interface Item {
  id: number;
  image_url: string;
  title: string;
}

interface ItemsListProps {
  data: Array<Item>;
  onClick: (id: number) => void;
  selectedItems: number[];
}

const Select: React.FC<ItemsListProps> = ({ 
  data,
  children,
  onClick: clickEvent,
  selectedItems,
}) => (
  <ul className="items-grid">
    {data.map(item => (
      <li 
        key={item.id}
        onClick={() => clickEvent(item.id)}
        className={selectedItems.includes(item.id) ? 'selected' : ''}
      >
        <img src={item.image_url} alt={item.title} />
        <span>{item.title}</span>
      </li>
    ))}
  </ul>
);

export default Select;