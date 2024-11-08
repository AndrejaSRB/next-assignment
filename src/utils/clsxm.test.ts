import clsxm from '@/utils/clsxm';

describe('clsxm', () => {
  it('should return combined class names', () => {
    const result = clsxm('btn', 'btn-primary');

    expect(result).toBe('btn btn-primary');
  });

  it('should return original string if only one parameter is passes', () => {
    const result = clsxm('btn');

    expect(result).toBe('btn');
  });

  it('should return merge conflits between Tailwind classes and keep the last one', () => {
    const result = clsxm('p-3', 'p-4');

    expect(result).toBe('p-4');
  });

  it('should handle class names arrays and falsy values', () => {
    const result = clsxm('p-3', ['text-lg', false && 'upparcase']);

    expect(result).toBe('p-3 text-lg');
  });

  it('should ignore undefined and null values', () => {
    const result = clsxm('p-3', null, undefined, 'text-lg');

    expect(result).toBe('p-3 text-lg');
  });
});
