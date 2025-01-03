const folderContents = {
    'Videos': {
        files: [
            { name: 'intro.mp4', size: '250 MB', type: 'MP4 Video', date: '02/15/2024' },
            { name: 'outro.mp4', size: '180 MB', type: 'MP4 Video', date: '02/16/2024' }
        ]
    },
    'Projects': {
        files: [
            { name: 'project1.prproj', size: '2.1 GB', type: 'Premiere Project', date: '02/10/2024' },
            { name: 'assets.zip', size: '500 MB', type: 'ZIP Archive', date: '02/12/2024' }
        ]
    },
    'Raw Footage': {
        files: [
            { name: 'clip001.mov', size: '4.2 GB', type: 'MOV Video', date: '02/01/2024' },
            { name: 'clip002.mov', size: '3.8 GB', type: 'MOV Video', date: '02/01/2024' }
        ]
    },
    'Photography': {
        files: []
    },
    'Street': {
        files: [
            { name: 'street_01.jpg', size: '4.2 MB', type: 'JPEG Image', date: '02/20/2024' },
            { name: 'street_02.jpg', size: '3.8 MB', type: 'JPEG Image', date: '02/20/2024' }
        ]
    },
    'Portrait': {
        files: [
            { name: 'portrait_series.zip', size: '850 MB', type: 'ZIP Archive', date: '02/05/2024' },
            { name: 'portrait_01.raw', size: '25 MB', type: 'RAW Image', date: '02/05/2024' }
        ]
    },
    'Coffee': {
        files: [
            { name: 'coffee_guide.pdf', size: '1.8 MB', type: 'PDF Document', date: '02/15/2024' },
            { name: 'beans.jpg', size: '2.1 MB', type: 'JPEG Image', date: '02/14/2024' }
        ]
    },
    'Recipes': {
        files: [
            { name: 'v60_recipe.txt', size: '12 KB', type: 'Text Document', date: '02/18/2024' },
            { name: 'aeropress.pdf', size: '1.5 MB', type: 'PDF Document', date: '02/17/2024' }
        ]
    }
};

function selectFolder(element) {
    // Remove selected class from all folders
    document.querySelectorAll('.folder-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selected class to clicked folder
    element.classList.add('selected');
    
    // Get folder name
    const folderName = element.querySelector('span:last-child').textContent;
    
    // Update files panel
    updateFilesPanel(folderName);
    
    // Update status bar
    updateStatusBar(folderName);
}

function updateFilesPanel(folderName) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear current files
    
    const folder = folderContents[folderName];
    if (folder && folder.files) {
        folder.files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span> ${file.name}</span>
                <span>${file.size}</span>
                <span>${file.type}</span>
                <span>${file.date}</span>
            `;
            fileList.appendChild(fileItem);
        });
    }
}

function updateStatusBar(folderName) {
    const statusCount = document.querySelector('.status-bar span:first-child');
    const statusPath = document.querySelector('.status-bar span:last-child');
    
    const fileCount = folderContents[folderName]?.files.length || 0;
    statusCount.textContent = `${fileCount} object(s)`;
    statusPath.textContent = folderName;
}

// Initialize with first folder
document.addEventListener('DOMContentLoaded', () => {
    const firstFolder = document.querySelector('.folder-item');
    if (firstFolder) {
        selectFolder(firstFolder);
    }
});

// Add this function
function logout() {
    sessionStorage.removeItem('authenticated');
    window.location.href = 'project6-login.html';
}

// Add this to your HTML where the close button is
<button class="close-button" onclick="logout()">×</button> 