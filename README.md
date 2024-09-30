# Project Setup Instructions

Follow these steps to clean and set up the project:

1. **Remove `node_modules` directory**

   ```bash
   rm -rf node_modules

   ```

2. **Remove `Podfile.lock` file**

```bash
   rm -rf ios/Podfile.lock
```

3. **Remove `Pods` directory**

```bash
   rm -rf ios/Pods
```

4. **Install dependencies**

```bash
   npm i
```

5. **Install iOS Pods**

```bash
   npm run pod
```

6. **Start metro**

```bash
   npm run metro
```
