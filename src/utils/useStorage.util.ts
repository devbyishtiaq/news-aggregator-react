interface UseStorage {
  setItem<T>(key: string, value: T): void;
  getItem<T>(key: string): T | null;
  removeItem(key: string): void;
  clearStorage(): void;
}

const useStorage: UseStorage = {
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to Local Storage:", error);
    }
  },

  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error("Error retrieving from Local Storage:", error);
      return null;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from Local Storage:", error);
    }
  },

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing Local Storage:", error);
    }
  },
};

export default useStorage;
