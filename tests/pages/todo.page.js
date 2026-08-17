// pages/todo.page.js
class TodoPage {
  constructor(page) {
    this.page = page;
    this.todoInput = page.locator('#todoInput'); // Replace with your input selector if different
    
    // Target only visible list items to ignore hidden template elements
    this.todoItems = page.locator('#todoList li:visible');
    this.itemsLeftLabel = page.locator('#items-left');
  }

  // Navigate to the app and clear local storage to isolate tests
  async goto() {
    await this.page.goto('http://localhost:5500');
    // Clear browser storage so every test starts with 0 items
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload();
  }

  // Add a new todo item
  async addTodo(text) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
    await this.todoItems.getByText(text).waitFor();
  }

  // Delete a specific todo item by text
  async deleteTodoByText(text) {
    // Debug log to inspect available items
    console.log('Current items in list:', await this.todoItems.allInnerTexts());

    // Locate the specific item using case-insensitive regex
    const todoItem = this.todoItems.filter({ hasText: new RegExp(text, 'i') });
    
    // Click delete button inside that item
    await todoItem.locator('.delete-btn').click({ force: true });
  }

  /**
   * Waits for the element to be visible and returns the leading number from its text content.
   * @returns {Promise<number>} The extracted count of active To-Dos.
   */
  async getTheNumberOfAktivToDos() {
    // 1. Wait until the dynamically rendered element is visible
    await this.itemsLeftLabel.waitFor({ state: 'visible' });

    // 2. Get the inner text of the element
    const text = await this.itemsLeftLabel.innerText();

    // 3. Extract leading digits using regex (e.g., "3 items" -> "3")
    const match = text.trim().match(/^\d+/);

    // 4. Return the parsed integer (returns 0 if no digits found)
    return match ? parseInt(match[0], 10) : 0;
  }

  // Helper method to take screenshots
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }
}

module.exports = { TodoPage };