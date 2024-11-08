/**
 * Groups an array of items based on a key function.
 *
 * @template T - The type of elements in the input array
 * @param {T[]} arr - The array to group
 * @param {function(T): string} key - A function that returns the grouping key for each item
 * @returns {Record<string, T[]>} An object where keys are the group names and values are arrays of items
 *
 * @example
 * // Group objects by category
 * const items = [
 *   { id: 1, category: 'fruit', name: 'apple' },
 *   { id: 2, category: 'vegetable', name: 'carrot' }
 * ];
 * const result = groupBy(items, item => item.category);
 * // Result: { fruit: [...], vegetable: [...] }
 *
 */
const groupBy = <T>(arr: T[], key: (item: T) => string) => {
  const groups: Record<string, T[]> = {};
  return arr.reduce((groups, item) => {
    const group = key(item);
    groups[group] = groups[group] ?? [];
    groups[group].push(item);
    return groups;
  }, groups);
};

export default groupBy;
