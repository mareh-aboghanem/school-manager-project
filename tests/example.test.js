import { describe, expect, test } from 'vitest';
import { parseCommand } from '../src/command-parser.js';
import { checkDatePattern, idGenerator } from '../src/commonFunction.js';

describe('Example Test', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});

describe('TEST parseCommand returns expected object', () => {
  test('parseCommand returns expected object', () => {
    const input = 'TRAINEE ADD John Doe';
    const result = parseCommand(input);
    expect(result).toEqual({
      command: 'TRAINEE',
      subcommand: 'ADD',
      args: ['John', 'Doe'],
    });
  });
});

describe('TEST checkDatePattern valid', () => {
  test('Date pattern  is valid', () => {
    const input = '2024-05-10';
    expect(() => checkDatePattern(input)).not.toThrow();
  });
});

describe('TEST checkDatePattern invalid', () => {
  test('Date pattern is not valid', () => {
    const input = '10-05-2024';
    expect(() => checkDatePattern(input)).toThrow();
  });
});

describe('TEST parseCommand trims extra spaces', () => {
  test('handles multiple spaces correctly', () => {
    const input = 'COURSE   LEAVE   47132   12345';
    const result = parseCommand(input);

    expect(result).toEqual({
      command: 'COURSE',
      subcommand: 'LEAVE',
      args: ['47132', '12345'],
    });
  });
});

describe('TEST idGenerator uniqueness', () => {
  test('generated id should not exist in data', () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const newId = idGenerator(data);

    const exists = data.some((item) => item.id === newId);

    expect(exists).toBe(false);
  });
});
