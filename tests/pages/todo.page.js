// pages/todo.page.js
class TodoPage {
  constructor(page) {
    this.page = page;
    this.todoInput = page.locator('#todoInput'); // Replace with your input selector if different
    
    // Target only visible list items to ignore hidden template elements
    this.todoItems = page.locator('#todoList li:visible');
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

  // Helper method to take screenshots
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }
}

module.exports = { TodoPage };