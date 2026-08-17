const API_URL = 'http://localhost:8001';  // or whatever you name the backend container

// Load items when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    
    // Handle form submission
    document.getElementById('createForm').addEventListener('submit', createItem);
});

// Create a new item
async function createItem(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    
    try {
        const response = await fetch(`${API_URL}/items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });
        
        if (response.ok) {
            showMessage('Item created successfully!', 'success');
            document.getElementById('createForm').reset();
            loadItems();
        } else {
            showMessage('Failed to create item', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server', 'error');
    }
}

// Load all items
async function loadItems() {
    try {
        const response = await fetch(`${API_URL}/items/`);
        
        if (response.ok) {
            const items = await response.json();
            displayItems(items);
        } else {
            showMessage('Failed to load items', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server', 'error');
    }
}

// Display items on the page
function displayItems(items) {
    const itemsList = document.getElementById('itemsList');
    
    if (items.length === 0) {
        itemsList.innerHTML = '<div class="empty-state">No items yet. Create one above!</div>';
        return;
    }
    
    itemsList.innerHTML = items.map(item => `
        <div class="item">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description || 'No description')}</p>
            <div class="item-meta">
                ID: ${item.id} | Created: ${new Date(item.created_at).toLocaleString()}
            </div>
            <button onclick="deleteItem(${item.id})" class="btn btn-danger">Delete</button>
        </div>
    `).join('');
}

// Delete an item
async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/items/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Item deleted successfully!', 'success');
            loadItems();
        } else {
            showMessage('Failed to delete item', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server', 'error');
    }
}

// Show message to user
function showMessage(text, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    const container = document.querySelector('.container');
    container.insertBefore(message, container.firstChild.nextSibling);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
