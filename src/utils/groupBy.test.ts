import groupBy from './groupBy';

type Item = {
  id: number;
  category: string;
  name: string;
};

describe('groupBy', () => {
  it('should group array items by the given key function', () => {
    const items = [
      { id: 1, category: 'fruit', name: 'apple' },
      { id: 2, category: 'vegetable', name: 'carrot' },
      { id: 3, category: 'fruit', name: 'banana' },
      { id: 4, category: 'vegetable', name: 'potato' },
    ];

    const result = groupBy(items, (item) => item.category);

    expect(result).toEqual({
      fruit: [
        { id: 1, category: 'fruit', name: 'apple' },
        { id: 3, category: 'fruit', name: 'banana' },
      ],
      vegetable: [
        { id: 2, category: 'vegetable', name: 'carrot' },
        { id: 4, category: 'vegetable', name: 'potato' },
      ],
    });
  });

  it('should handle empty arrays', () => {
    const items: Item[] = [];
    const result = groupBy(items, (item) => item.category);
    expect(result).toEqual({});
  });

  it('should handle single item arrays', () => {
    const items = [{ id: 1, category: 'fruit', name: 'apple' }];
    const result = groupBy(items, (item) => item.category);
    expect(result).toEqual({
      fruit: [{ id: 1, category: 'fruit', name: 'apple' }],
    });
  });

  it('should group by primitive values', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const result = groupBy(numbers, (num) => (num % 2 === 0 ? 'even' : 'odd'));
    expect(result).toEqual({
      odd: [1, 3, 5],
      even: [2, 4, 6],
    });
  });
});
