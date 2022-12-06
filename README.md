# File manager

CLI tool for manipulating files

## Start tool

Type in console:

```bash
npm run start -- --username=your_username
```

Example:

```bash
npm run start -- --username=jane_doe
```

## Commands

| command                                       | action                                                                                                  |
|-----------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `.exit`                                       | Exit from CLI File Manager                                                                              |
| `.help` or `help`                             | Commands listing                                                                                        |
| `up`                                          | Go upper from current directory                                                                         |
| `cd path_to_directory`                        | Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)         |
| `ls`                                          | List all files and folder in current directory and print it to console                                  |
| `cat path_to_file`                            | Read file and print it's content in console                                                             |
| `add new_file_name`                           | Create empty file in current working directory                                                          |
| `rn path_to_file new_filename`                | Rename file                                                                                             |
| `cp path_to_file path_to_new_directory`       | Copy file                                                                                               |
| `mv path_to_file path_to_new_directory`       | Move file (same as copy but initial file is deleted)                                                    |
| `rm path_to_file`                             | Delete file                                                                                             |
| `os --EOL`                                    | Get default system End-Of-Line                                                                          |
| `os --cpus`                                   | Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) |
| `os --homedir`                                | Get home directory                                                                                      |
| `os --username`                               | Get current system user name                                                                            |
| `os --architecture`                           | Get CPU architecture for which Node.js binary has compiled                                              |
| `hash path_to_file`                           | Calculate hash for file and print it into console                                                       |
| `compress path_to_file path_to_destination`   | Compress file (using Brotli algorithm)                                                                  |
| `decompress path_to_file path_to_destination` | Decompress file (using Brotli algorithm)                                                                |

## Exit

Press `Ctrl+C` or type in console with active tool `.exit` command
