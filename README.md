# Angular Electron Timer

A secure desktop focus timer built with Angular and Electron.

![](https://firebasestorage.googleapis.com/v0/b/firestarter-96e46.appspot.com/o/assets%2Fangular-electron-timer.gif?alt=media&token=597f37b8-8983-414c-8b08-c038621f12d7)

- Angular 22
- Electron 44
- TypeScript 6
- pnpm with a frozen lockfile
- Electron sandboxing, context isolation and Node integration disabled

## Basic Usage

```shell
git clone
cd angular-electron
pnpm install --frozen-lockfile

# build the app
pnpm electron-build
```

## Verification

```shell
pnpm audit --prod --audit-level high
pnpm test
pnpm build
```
