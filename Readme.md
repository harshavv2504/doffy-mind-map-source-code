# 🧠 DO.ffy

**DO.ffy** is a highly customizable, feature-rich mind mapping application built with **React** and **React Flow**. It provides an intuitive, full-screen canvas for users to create, organize, and visualize their ideas effortlessly.

### The Blueprint for Your Vision

Documenting a project's flow is more than just a task; it's the art of creating a blueprint for your vision. This visual map is essential for understanding logic, anticipating challenges, and communicating a clear path forward. I created DO.ffy because this foundational process should never be constrained.

My frustration grew from tools that would lock away features or demand a subscription right when the architectural details became most critical. DO.ffy is the answer: a free, professional-grade canvas dedicated to the art of documentation. It provides the freedom and power to design and map out your project flows with the elegance and precision they demand, ensuring your blueprint is always complete.

**Created by:** Harsha Vardhan
**Date:** 01 August 2025

---

## ✨ Key Features

- **Dynamic Canvas**  
  A clean, infinite canvas that supports panning, zooming, and a minimalist dot-grid background.

- **Rich Node Customization**  
  Right-click any node to open a context menu to:
  - 🎨 Change background color from a predefined palette.
  - 🧊 Modify the node's shape (square, rounded, or pill).
  - ✍️ Select a custom text color.
  - 🏷️ Add a decorative icon badge from an extensible library.

- **Dual Node Types**  
  Add standard nodes for core ideas or transparent content nodes for supplementary information.

- **Effortless Connections**  
  Simply drag between nodes to create connections. Handles are hidden until hover for a clean UI.

- **🤖 Intelligent Auto-Layout**  
  Automatically arrange your entire mind map into a clean, hierarchical structure with a single click.

- **History Control**  
  Full undo and redo support for all your actions.

- **Save & Load**  
  Save your entire mind map to a local JSON file with a custom name, and load it back in anytime.

- **Export to PNG**  
  Export your finished mind map as a high-quality PNG image to share or embed.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need **Node.js** (version 18.x or higher) and a package manager like **npm** or **yarn** installed on your computer.

### Installation

**Clone the repository:**

```bash
git clone https://github.com/your-username/your-repository-name.git
```

**Navigate to the project directory:**

```bash
cd your-repository-name
```

**Install the dependencies:**

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to view it in the browser.

---

### 🕹️ How to Use

**Adding Nodes**  
Use the control panel to add a new "Standard Node" or "Content Node" to the canvas.

**Connecting Nodes**  
Hover over a node to reveal its connection handles, then click and drag from one handle to another to create an edge.

**Customizing Nodes**  
Right-click any node to open the context menu. From there, you can change its color, shape, text color, or add an icon.

**Arranging the Map**  
Click the "Auto-Layout" button to automatically organize all nodes and connections neatly.

**Saving Your Work**  
Click the "Save" button, enter a filename, and your mind map will be downloaded as a .json file.

**Loading a Map**  
Click the "Load" button and select a previously saved .json file to restore your session.

**Exporting an Image**  
Click "Export to PNG" to download a PNG image of your current mind map view.

---

### 🛠️ Tech Stack

- **Framework:** React  
- **Canvas Library:** React Flow  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS

