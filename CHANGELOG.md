# Important Changes

## Engines

-   Added **node** with `>=10.0.0`

## License

Source code now under `MIT` license.

## Dependencies

-   Added **[ansi-escapes](https://www.npmjs.com/package/ansi-escapes/v/4.2.1)** with `^4.2.1`
-   Added **[ansi-styles](https://www.npmjs.com/package/ansi-styles/v/4.0.0)** with `^4.0.0`
-   Added **[string-width](https://www.npmjs.com/package/string-width/v/4.1.0)** with `^4.1.0`
-   Added **[strip-ansi](https://www.npmjs.com/package/strip-ansi/v/5.2.0)** with `^5.2.0`

## DevDependencies

-   Added **[@types/ansi-styles](https://www.npmjs.com/package/@types/ansi-styles/v/3.2.1)** with `^3.2.1`
-   Added **[@types/jest](https://www.npmjs.com/package/@types/jest/v/24.0.17)** with `^24.0.17`
-   Added **[@types/node](https://www.npmjs.com/package/@types/node/v/12.7.1)** with `^12.7.1`
-   Added **[@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin/v/1.13.0)** with `^1.13.0`
-   Added **[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser/v/1.13.0)** with `^1.13.0`
-   Added **[changelog-guru](https://www.npmjs.com/package/changelog-guru/v/0.10.0)** with `^0.10.0`
-   Added **[eslint](https://www.npmjs.com/package/eslint/v/6.1.0)** with `^6.1.0`
-   Added **[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base/v/13.2.0)** with `^13.2.0`
-   Added **[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier/v/6.0.0)** with `^6.0.0`
-   Added **[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import/v/2.18.2)** with `^2.18.2`
-   Added **[eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest/v/22.15.0)** with `^22.15.0`
-   Added **[husky](https://www.npmjs.com/package/husky/v/3.0.2)** with `^3.0.2`
-   Added **[jest](https://www.npmjs.com/package/jest/v/24.8.0)** with `^24.8.0`
-   Added **[npm-run-all](https://www.npmjs.com/package/npm-run-all/v/4.1.5)** with `^4.1.5`
-   Added **[prettier](https://www.npmjs.com/package/prettier/v/1.18.2)** with `^1.18.2`
-   Added **[ts-jest](https://www.npmjs.com/package/ts-jest/v/24.0.2)** with `^24.0.2`
-   Added **[typescript](https://www.npmjs.com/package/typescript/v/3.5.3)** with `^3.5.3`

# Features

-   Add stdout hooks, configure project [`6c2f226`](https://github.com/keindev/stdout-update/commit/6c2f226a4979ba0a26c3ea8450f5f14d0ea80fd9)
-   Add hook for stdout & stderr [`319cccf`](https://github.com/keindev/stdout-update/commit/319cccfb3640e72e6c1858ca8cd21d385ae00668)
-   Add Hook clear, refactor [`478f7d5`](https://github.com/keindev/stdout-update/commit/478f7d5122fea53d25d28e5aa37b0815f7f49e65)
-   Add terminal class [`b3a5073`](https://github.com/keindev/stdout-update/commit/b3a5073c5eb20e42d8129d6c0e4a5482e4328693)

# Improvements

-   **[Hook]** Add flag for separate logs & writes [`33f0428`](https://github.com/keindev/stdout-update/commit/33f042884f978cde93e77ab6462e9266f80ebf48)

# Bug Fixes

-   **[Eslint]** Fix eslint config [`720ca54`](https://github.com/keindev/stdout-update/commit/720ca545e7f65d4009885b1813412cc0fd9a392a)
-   Cast "Uint8Array" to string [`cf3eca9`](https://github.com/keindev/stdout-update/commit/cf3eca9a303c9c03ec859eead00a558f6c70e6b0)
-   Change update text parameter to string [`41e59ec`](https://github.com/keindev/stdout-update/commit/41e59ec08c802c2d05f3fa88a15751d573574d62)
-   Word wrapping [`7152ea7`](https://github.com/keindev/stdout-update/commit/7152ea7018d88ea124e13d72262b0e83141e411c)
-   Remova @types\/ansi\-styles from dependencies [`9e61b9b`](https://github.com/keindev/stdout-update/commit/9e61b9bc9d9f32f1e6f0d12de39f064af6b8ef08)
-   Output a lines greater than term\.rows count [`df82444`](https://github.com/keindev/stdout-update/commit/df824441b5d8976afafea914072708e9ebeedaaa)
-   Stdout update [`4fb8a1d`](https://github.com/keindev/stdout-update/commit/4fb8a1d8d0dc3412501d475d991172cb17d23c96)
-   Fix bug with updating fixed rows count [`563c2fa`](https://github.com/keindev/stdout-update/commit/563c2fa24b4bb6fa574347bdf6ad1030a445239b)
-   Fix error with updating by row index [`3bd2577`](https://github.com/keindev/stdout-update/commit/3bd2577effecde737e1c396fc8a7aee5f8058bce)

# Internal changes

-   **[Coverage]** Remove mocks folder from report [`14b03fc`](https://github.com/keindev/stdout-update/commit/14b03fc35c7531856eebe870b7edd713210bf532)
-   **[Example, Example]** Update example [`25d2793`](https://github.com/keindev/stdout-update/commit/25d2793e4e29a1b8d366fca95dc67373670718dd) [`535b22d`](https://github.com/keindev/stdout-update/commit/535b22d65ee4b1636c84301c88a0e29f8c4c8cba)
-   **[Example]** Refactor example\/app [`9237a73`](https://github.com/keindev/stdout-update/commit/9237a73d69945579311840cfb13c95143e5444c2)
-   **[Hook]** Fix test for hook [`1022f28`](https://github.com/keindev/stdout-update/commit/1022f28393331bc1009200cfa23260929172187b)
-   **[Media]** Fix logo animation [`ab28ec6`](https://github.com/keindev/stdout-update/commit/ab28ec6ab42f0fa4c6fca8ad2d18778c904eb1fd)
-   **[Mocks]** Rename mocks folder to \_\_mocks\_\_ [`e244aa3`](https://github.com/keindev/stdout-update/commit/e244aa3f93747035c0e7c108beebec9e9cbbc48e)
-   **[Package]** Update dependencies [`ed6f391`](https://github.com/keindev/stdout-update/commit/ed6f391da292616dcae1dc597bc7013857e0d39a) [`6830b64`](https://github.com/keindev/stdout-update/commit/6830b64d7fbcfcac6e3c92386bf3566de493d837) [`c5d333e`](https://github.com/keindev/stdout-update/commit/c5d333e2b7787c08750fdd62db058ff166b3b371) [`800d0f8`](https://github.com/keindev/stdout-update/commit/800d0f8df00014a96e95c2961afde9faa73e087e) [`7c681d3`](https://github.com/keindev/stdout-update/commit/7c681d37117f7c3da5cbb99bcecfe0c8a1b91129) [`1f8d376`](https://github.com/keindev/stdout-update/commit/1f8d37608676ae63e06b46fa67ee97ba8fe9129e) [`baf2131`](https://github.com/keindev/stdout-update/commit/baf2131a388b8e669f849c2b0d94dfc0516db318) [`9549681`](https://github.com/keindev/stdout-update/commit/95496810197f66f5dd1ef7bb3eac2bc7deb4aede)
-   **[Readme]** Fix logo src to jsdelivr [`25f7f02`](https://github.com/keindev/stdout-update/commit/25f7f02a4af1bdffb1af6182a1f7d715cab3cc18)
-   **[Readme]** Align gif with example in the center [`c5c0eda`](https://github.com/keindev/stdout-update/commit/c5c0edae0c4c23ae1278d455c60ad1f52fe59898)
-   **[Readme]** Add desc of new manager methods [`cdb9e6f`](https://github.com/keindev/stdout-update/commit/cdb9e6f0ebfdda636d1d5a0152953cba7951097b)
-   **[Readme]** Correct method description [`7444485`](https://github.com/keindev/stdout-update/commit/7444485237e0e291e8359f57a0f49ad4ddbbb645)
-   **[Readme]** Update install section [`2f0886b`](https://github.com/keindev/stdout-update/commit/2f0886b2533a312990a9c9604bd3982e8b628dd7)
-   **[Readme]** Update signature of 'update' method [`76fd194`](https://github.com/keindev/stdout-update/commit/76fd194cd8e565239425a23247937a6b340715a2)
-   **[Readme]** Add new Hook flag desc [`513844b`](https://github.com/keindev/stdout-update/commit/513844b2c865eab4d6fc4f0ae7ef2c05478d4507)
-   **[Stream]** Fix stream mock typing [`021b499`](https://github.com/keindev/stdout-update/commit/021b499436346c43039f54cd293683c2944431c2)
-   **[Wrapper, Terminal]** Change tests [`f236b92`](https://github.com/keindev/stdout-update/commit/f236b92fe15f5679661e65945d7f13f13d01b7b1)
-   Modify test for Hook and UpdateManager [`faba0bd`](https://github.com/keindev/stdout-update/commit/faba0bdb570a84d8687734fce0667def241e8654)
-   Add demo\.gif, refactor example [`e4c654e`](https://github.com/keindev/stdout-update/commit/e4c654e828a7619a03470b3038a461b9ac3dea61)
-   Add logo [`88adeee`](https://github.com/keindev/stdout-update/commit/88adeee9e2ae7dfe08e1892827802c6e034c6440)
-   Add readme text [`282802c`](https://github.com/keindev/stdout-update/commit/282802c572124745506b4572fa7b583e2dcfe4ee)
-   Fix precommit hook [`1b33352`](https://github.com/keindev/stdout-update/commit/1b333529c10b20a242beee0174b2f59acbb9f47e)
-   Fix logo url [`360c2ed`](https://github.com/keindev/stdout-update/commit/360c2ed02d75964c6e423ad026251e851428b8ad)
-   Add test for update method [`c00b70a`](https://github.com/keindev/stdout-update/commit/c00b70af011fe1b4a7c68ad995e9e79e614e5a3a)
-   Delete extra file demo conf [`b9138f4`](https://github.com/keindev/stdout-update/commit/b9138f406a34ccd88e1a18034f5bd33604d95d16)
-   Add test for Terminal [`19826dc`](https://github.com/keindev/stdout-update/commit/19826dc28c4f78ad7d28047f1c3df93b8b9f8e6c) [`d99c453`](https://github.com/keindev/stdout-update/commit/d99c453d5da11cc69227b7ca11287db5dd7c7b06)
-   Update tests for manager [`8ff2c73`](https://github.com/keindev/stdout-update/commit/8ff2c733246ef42996241eaa37eb2c5aaf44fc59)
-   Downgrade eslint [`6f739a2`](https://github.com/keindev/stdout-update/commit/6f739a2b91f0b8e96650209f6141568b44f10038)

# Code Refactoring

## Multyline output

-   Rework update process \- part 1 [`af43f99`](https://github.com/keindev/stdout-update/commit/af43f99b5b2ae5613eb42c9e7144c03756681393) [`11029e1`](https://github.com/keindev/stdout-update/commit/11029e18977c03c236622ae243765e497dd794f3) [`06fd143`](https://github.com/keindev/stdout-update/commit/06fd14341381094a1cb5786db5aa4dd919e293fc)

## Others

-   **[Terminal]** Refactor getWidth & getHeight [`956f7a4`](https://github.com/keindev/stdout-update/commit/956f7a4419387b914c07c1b20f20151e06f4d27a)
-   **[Test]** Refactor tests [`52e0d43`](https://github.com/keindev/stdout-update/commit/52e0d4350f71a73854d2e6b047a6d9664aa24c52)
-   Change Hook\.write, refactor tests [`090484e`](https://github.com/keindev/stdout-update/commit/090484e79477b68c24e627da1ca4f827a06bfae1)
-   Rename manager to update\-manager [`68919ba`](https://github.com/keindev/stdout-update/commit/68919bab2984aaa32ca7cd1ed8cf96c5ef3daab3)

---

# Contributors

[![@keindev](https://avatars3.githubusercontent.com/u/4527292?v=4&size=40)](https://github.com/keindev)
