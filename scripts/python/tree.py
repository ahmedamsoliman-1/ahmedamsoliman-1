import os

def generate_tree(dir_path, prefix="", depth=None, include_types=None, exclude_types=None, exclude_dirs=None):
    """Generate a tree structure for the given directory."""
    if depth is not None and depth < 0:
        return []

    contents = os.listdir(dir_path)
    contents.sort()
    tree = []

    for index, name in enumerate(contents):
        path = os.path.join(dir_path, name)
        is_dir = os.path.isdir(path)
        ext = os.path.splitext(name)[1][1:]

        if exclude_dirs and is_dir and name in exclude_dirs:
            continue
        if include_types and not is_dir and ext not in include_types:
            continue
        if exclude_types and not is_dir and ext in exclude_types:
            continue

        if index == len(contents) - 1:
            tree.append(f"{prefix}└── {name}")
            new_prefix = f"{prefix}    "
        else:
            tree.append(f"{prefix}├── {name}")
            new_prefix = f"{prefix}│   "

        if is_dir:
            tree.extend(generate_tree(path, new_prefix, None if depth is None else depth - 1, include_types, exclude_types, exclude_dirs))

    return tree

def print_tree_to_file(dir_path, output_file, depth=None, include_types=None, exclude_types=None, exclude_dirs=None):
    """Print the tree structure of the given directory to a file."""
    if not os.path.exists(dir_path):
        print(f"Error: The directory '{dir_path}' does not exist.")
        return

    tree = generate_tree(dir_path, "", depth, include_types, exclude_types, exclude_dirs)
    
    with open(output_file, 'w') as file:
        file.write(dir_path + '\n')
        for line in tree:
            file.write(line + '\n')

if __name__ == "__main__":
    # Define parameters here
    directory = "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/"
    output_file = "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/TREE.md"
    depth = 2
    include_types = ['py', 'cpp', 'js']
    exclude_types = ['log', 'tmp', 'dll', 'json', 'cpp.o', 'cpp.o.d', 'cmake', 'dylib', 'png', 'jpg', 'jpeg', 'pdf']
    exclude_dirs = ['node_modules', '__pycache__', '.git', 'secrets', 'github-artifacts', 'externals', 'external', 'cpp_external', 'F_Font-Awesome-4.7', 'docker-volumes']

    # Generate and print tree to file
    print_tree_to_file(directory, output_file, depth, include_types, exclude_types, exclude_dirs)
