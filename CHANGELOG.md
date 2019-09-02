# Important Changes

## Engines

-   Added **node** with `>=10.0.0`

## License

Source code now under `MIT` license.

## Dependencies

-   Added **[ansi-escapes](https://www.npmjs.com/package/ansi-escapes/v/4.2.1)** with `^4.2.1`
-   Added **[ansi-styles](https://www.npmjs.com/package/ansi-styles/v/4.1.0)** with `^4.1.0`
-   Added **[string-width](https://www.npmjs.com/package/string-width/v/4.1.0)** with `^4.1.0`
-   Added **[strip-ansi](https://www.npmjs.com/package/strip-ansi/v/5.2.0)** with `^5.2.0`

## Dev Dependencies

-   Added **[@types/ansi-styles](https://www.npmjs.com/package/@types/ansi-styles/v/3.2.1)** with `^3.2.1`
-   Added **[@types/jest](https://www.npmjs.com/package/@types/jest/v/24.0.18)** with `^24.0.18`
-   Added **[@types/node](https://www.npmjs.com/package/@types/node/v/12.7.3)** with `^12.7.3`
-   Added **[@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin/v/2.1.0)** with `^2.1.0`
-   Added **[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser/v/2.1.0)** with `^2.1.0`
-   Added **[changelog-guru](https://www.npmjs.com/package/changelog-guru/v/1.0.0)** with `^1.0.0`
-   Added **[cspell](https://www.npmjs.com/package/cspell/v/4.0.28)** with `^4.0.28`
-   Added **[eslint](https://www.npmjs.com/package/eslint/v/6.3.0)** with `^6.3.0`
-   Added **[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base/v/14.0.0)** with `^14.0.0`
-   Added **[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier/v/6.1.0)** with `^6.1.0`
-   Added **[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import/v/2.18.2)** with `^2.18.2`
-   Added **[eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest/v/22.16.0)** with `^22.16.0`
-   Added **[husky](https://www.npmjs.com/package/husky/v/3.0.5)** with `^3.0.5`
-   Added **[jest](https://www.npmjs.com/package/jest/v/24.9.0)** with `^24.9.0`
-   Added **[npm-run-all](https://www.npmjs.com/package/npm-run-all/v/4.1.5)** with `^4.1.5`
-   Added **[prettier](https://www.npmjs.com/package/prettier/v/1.18.2)** with `^1.18.2`
-   Added **[rimraf](https://www.npmjs.com/package/rimraf/v/3.0.0)** with `^3.0.0`
-   Added **[ts-jest](https://www.npmjs.com/package/ts-jest/v/24.0.2)** with `^24.0.2`
-   Added **[typescript](https://www.npmjs.com/package/typescript/v/3.6.2)** with `^3.6.2`

# Features

-   Add stdout hooks, configure project [`6c2f226`](https://github.com/keindev/stdout-update/commit/6c2f226a4979ba0a26c3ea8450f5f14d0ea80fd9)
-   Add hook for stdout & stderr [`319cccf`](https://github.com/keindev/stdout-update/commit/319cccfb3640e72e6c1858ca8cd21d385ae00668)
-   Add Hook clear, refactor [`478f7d5`](https://github.com/keindev/stdout-update/commit/478f7d5122fea53d25d28e5aa37b0815f7f49e65)
-   Add terminal class [`b3a5073`](https://github.com/keindev/stdout-update/commit/b3a5073c5eb20e42d8129d6c0e4a5482e4328693)

# Improvements

-   **[Hook]** Add flag for separate logs & writes [`33f0428`](https://github.com/keindev/stdout-update/commit/33f042884f978cde93e77ab6462e9266f80ebf48)

# Bug Fixes

-   **[Eslint]** Fix eslint config [`720ca54`](https://github.com/keindev/stdout-update/commit/720ca545e7f65d4009885b1813412cc0fd9a392a)
-   **[Lint]** Fix linting, fix lint errors [`133b313`](https://github.com/keindev/stdout-update/commit/133b313794d2d8b1ba2bfe5719c64bb65bbefb86)
-   **[UpdateManager]** Fix error in update with empty lines array [`9d50589`](https://github.com/keindev/stdout-update/commit/9d5058909c228092882a48540f9b57fc30d1971d)
-   Cast "Uint8Array" to string [`cf3eca9`](https://github.com/keindev/stdout-update/commit/cf3eca9a303c9c03ec859eead00a558f6c70e6b0)
-   Change update text parameter to string [`41e59ec`](https://github.com/keindev/stdout-update/commit/41e59ec08c802c2d05f3fa88a15751d573574d62)
-   Word wrapping [`7152ea7`](https://github.com/keindev/stdout-update/commit/7152ea7018d88ea124e13d72262b0e83141e411c)
-   Remova @types\/ansi\-styles from dependencies [`9e61b9b`](https://github.com/keindev/stdout-update/commit/9e61b9bc9d9f32f1e6f0d12de39f064af6b8ef08)
-   Output a lines greater than term\.rows count [`df82444`](https://github.com/keindev/stdout-update/commit/df824441b5d8976afafea914072708e9ebeedaaa)
-   Stdout update [`4fb8a1d`](https://github.com/keindev/stdout-update/commit/4fb8a1d8d0dc3412501d475d991172cb17d23c96)
-   Fix bug with updating fixed rows count [`563c2fa`](https://github.com/keindev/stdout-update/commit/563c2fa24b4bb6fa574347bdf6ad1030a445239b)
-   Fix error with updating by row index [`3bd2577`](https://github.com/keindev/stdout-update/commit/3bd2577effecde737e1c396fc8a7aee5f8058bce)

# Internal changes

-   **[Actions]** Fix main workflow [`8d9ef03`](https://github.com/keindev/stdout-update/commit/8d9ef0326f5ef3c51823648c9284eb4bfdee477f)
-   **[Actions]** Update main workflow [`a5211e5`](https://github.com/keindev/stdout-update/commit/a5211e50ef33ad0dd7031ba2e264254da2d093bb)
-   **[Actions]** Update uses in steps [`62352f4`](https://github.com/keindev/stdout-update/commit/62352f48325258b94fba9087f0346cfc6c3488f9)
-   **[Actions]** Update main action [`efc7802`](https://github.com/keindev/stdout-update/commit/efc78025c66aa4101ba3373d56beab7311b2a113)
-   **[Actions]** Fix yaml errors [`eeab6b9`](https://github.com/keindev/stdout-update/commit/eeab6b95f8470fe864ba1c93dda8202526179793) [`bbdafd3`](https://github.com/keindev/stdout-update/commit/bbdafd31f922a029bffcc7d6f705ed50f78e691e)
-   **[Actions]** Fix structure [`affb7a0`](https://github.com/keindev/stdout-update/commit/affb7a0efb1012848126900fe120c2ef4d4b5e24)
-   **[Actions]** Fix rename matrix\.node\_version to \.node [`dc613b8`](https://github.com/keindev/stdout-update/commit/dc613b834fe844f40a6fc588e2ebd5ffc6b4a197)
-   **[Actions]** Fix errors in yml file [`d3e4f80`](https://github.com/keindev/stdout-update/commit/d3e4f80572afc76a9acff0d5596468748f7d0822)
-   **[Actions]** Add build step [`7637a92`](https://github.com/keindev/stdout-update/commit/7637a927a52ab461b3e4b21b7233c6a8ec1b310c)
-   **[Actions]** Fix main action conf [`1a63244`](https://github.com/keindev/stdout-update/commit/1a6324488125a557026fbd11b4e0a8502e5f9ece)
-   **[Actions]** Escape names [`c3b3a03`](https://github.com/keindev/stdout-update/commit/c3b3a0391b562600a26b9acdb79bb169aaab5543)
-   **[Actions]** Fix steps names, fix yarn build on win [`50e46bd`](https://github.com/keindev/stdout-update/commit/50e46bde5ed3c73af8fcba15e28c93f8b4eb3662)
-   **[Actions]** Test yarn lint commands [`24bc621`](https://github.com/keindev/stdout-update/commit/24bc621c9a7251c2206e56fd2de7fde2351400b3)
-   **[Actions]** Remove travisci config, fix win errors [`0df916f`](https://github.com/keindev/stdout-update/commit/0df916f10c18729dd2206537031f6785518220fa)
-   **[Actions]** Add codecov reports [`ea53c70`](https://github.com/keindev/stdout-update/commit/ea53c70c177cfa3cbbb8147ead5e7af020becfca)
-   **[Actions]** Fix codecov if condition [`ff459da`](https://github.com/keindev/stdout-update/commit/ff459da71cae885c0641484e07438f5c6cf321fe)
-   **[Actions]** Fix codecov run error [`8dc9121`](https://github.com/keindev/stdout-update/commit/8dc9121692e565c00d3e7f33f769bb8b006572cb)
-   **[Actions]** Fix codecov condition [`566604f`](https://github.com/keindev/stdout-update/commit/566604fa240ce3a4b16c57edc443630afeab14e6)
-   **[Actions]** Add declaratively setup labels [`f9c64e1`](https://github.com/keindev/stdout-update/commit/f9c64e103cc072e17d30798019a3e9dfdb8fa2a4)
-   **[Actions]** Add manage action [`83ab1bc`](https://github.com/keindev/stdout-update/commit/83ab1bcb4fbbdc30107b593b2cb87ee419366324)
-   **[Actions]** Remove needs option from build action [`bb6b263`](https://github.com/keindev/stdout-update/commit/bb6b263469dfd41e9af2a41a089e88c75e91b592)
-   **[Actions]** Add GH token to manage action [`5ea8e45`](https://github.com/keindev/stdout-update/commit/5ea8e45df41ba126f8fd1ff9d4c2747cdcbac6f2)
-   **[Actions]** Remove manage action [`8178ace`](https://github.com/keindev/stdout-update/commit/8178ace101eef11adea08dd16f7487f99dcc39c6)
-   **[Actions]** Add publish action [`31b31a6`](https://github.com/keindev/stdout-update/commit/31b31a6e254e0f8ff27a9233e10f21dfa14464e4)
-   **[Actions]** Fix args option in publish action [`ebe84b1`](https://github.com/keindev/stdout-update/commit/ebe84b12ceeb00893adf392bb00a1bf78452a737)
-   **[Actions]** Fix uses option in publish job [`c571f84`](https://github.com/keindev/stdout-update/commit/c571f84ef0279297a9dd47ab20f0b2dc4bcaf74a)
-   **[Actions]** Bin\/filter test [`70d89f3`](https://github.com/keindev/stdout-update/commit/70d89f3824a1127ed963c404a364f7d9d1aec1ee)
-   **[Actions]** Add publish workflow [`8bd112d`](https://github.com/keindev/stdout-update/commit/8bd112da65af92fb48cec5df240191942a57082f)
-   **[Actions]** Fix publish errors [`9ba8772`](https://github.com/keindev/stdout-update/commit/9ba8772660f8ff296c749e591dcf63ca7fa419c9)
-   **[Actions]** Add discord notify [`f78214a`](https://github.com/keindev/stdout-update/commit/f78214a79838c210f4fd19a607e061659a9dcc02)
-   **[Actions]** Rework main action [`14d7e2d`](https://github.com/keindev/stdout-update/commit/14d7e2d70833a4b4399d2f5e6b59c38e194a3f4d)
-   **[Actions]** Add coverage report contion [`8aea964`](https://github.com/keindev/stdout-update/commit/8aea964336a706fd30324cdab5fc29f4a972b48a)
-   **[Actions]** Fix discord notify on failure [`44d36e5`](https://github.com/keindev/stdout-update/commit/44d36e55cba97a2827cc86b7e640075d24b8a875)
-   **[Changelog]** Generate changelog [`fdccc82`](https://github.com/keindev/stdout-update/commit/fdccc823f875d78040b9f80224d0531368f2e4a7)
-   **[Coverage]** Remove mocks folder from report [`14b03fc`](https://github.com/keindev/stdout-update/commit/14b03fc35c7531856eebe870b7edd713210bf532)
-   **[Cspell]** Add spell checker config [`a8f436f`](https://github.com/keindev/stdout-update/commit/a8f436f7308b032932f7b3967a3a953e88596611)
-   **[Debug]** Remove debug from package, fix vscode launch config [`97249bb`](https://github.com/keindev/stdout-update/commit/97249bbc6f0fdc3d1b932aa3b1ae653f0666f618)
-   **[Discord]** Add condition for notify action [`0c51681`](https://github.com/keindev/stdout-update/commit/0c51681de12add16b989c3bb5e767a5320a2a7aa)
-   **[ESLint]** Add blanck line rules [`f42e1d0`](https://github.com/keindev/stdout-update/commit/f42e1d00430e3d9325d9ba9a3a05fedb737b33df)
-   **[Example, Example]** Update example [`25d2793`](https://github.com/keindev/stdout-update/commit/25d2793e4e29a1b8d366fca95dc67373670718dd) [`535b22d`](https://github.com/keindev/stdout-update/commit/535b22d65ee4b1636c84301c88a0e29f8c4c8cba)
-   **[Example]** Refactor example\/app [`9237a73`](https://github.com/keindev/stdout-update/commit/9237a73d69945579311840cfb13c95143e5444c2)
-   **[Hook]** Fix test for hook [`1022f28`](https://github.com/keindev/stdout-update/commit/1022f28393331bc1009200cfa23260929172187b)
-   **[Husky]** Fix commit\-msg hook [`4b20a9b`](https://github.com/keindev/stdout-update/commit/4b20a9b510d3025b80a2e5dec33d14e53636a6f9)
-   **[Media]** Fix logo animation [`ab28ec6`](https://github.com/keindev/stdout-update/commit/ab28ec6ab42f0fa4c6fca8ad2d18778c904eb1fd)
-   **[Mocks]** Rename mocks folder to \_\_mocks\_\_ [`e244aa3`](https://github.com/keindev/stdout-update/commit/e244aa3f93747035c0e7c108beebec9e9cbbc48e)
-   **[Package]** Update dependencies [`ed6f391`](https://github.com/keindev/stdout-update/commit/ed6f391da292616dcae1dc597bc7013857e0d39a) [`6830b64`](https://github.com/keindev/stdout-update/commit/6830b64d7fbcfcac6e3c92386bf3566de493d837) [`c5d333e`](https://github.com/keindev/stdout-update/commit/c5d333e2b7787c08750fdd62db058ff166b3b371) [`800d0f8`](https://github.com/keindev/stdout-update/commit/800d0f8df00014a96e95c2961afde9faa73e087e) [`7c681d3`](https://github.com/keindev/stdout-update/commit/7c681d37117f7c3da5cbb99bcecfe0c8a1b91129) [`1f8d376`](https://github.com/keindev/stdout-update/commit/1f8d37608676ae63e06b46fa67ee97ba8fe9129e) [`baf2131`](https://github.com/keindev/stdout-update/commit/baf2131a388b8e669f849c2b0d94dfc0516db318) [`9549681`](https://github.com/keindev/stdout-update/commit/95496810197f66f5dd1ef7bb3eac2bc7deb4aede)
-   **[Package]** Fix author email [`f543b86`](https://github.com/keindev/stdout-update/commit/f543b866e4d4ee6176fb0e23abdf8ad8eebee43f)
-   **[Package]** Fix scripts [`b3acc1d`](https://github.com/keindev/stdout-update/commit/b3acc1d0ca1bf305863cceeaf8fa1f15e832292f)
-   **[Readme]** Fix logo src to jsdelivr [`25f7f02`](https://github.com/keindev/stdout-update/commit/25f7f02a4af1bdffb1af6182a1f7d715cab3cc18)
-   **[Readme]** Align gif with example in the center [`c5c0eda`](https://github.com/keindev/stdout-update/commit/c5c0edae0c4c23ae1278d455c60ad1f52fe59898)
-   **[Readme]** Add desc of new manager methods [`cdb9e6f`](https://github.com/keindev/stdout-update/commit/cdb9e6f0ebfdda636d1d5a0152953cba7951097b)
-   **[Readme]** Correct method description [`7444485`](https://github.com/keindev/stdout-update/commit/7444485237e0e291e8359f57a0f49ad4ddbbb645)
-   **[Readme]** Update install section [`2f0886b`](https://github.com/keindev/stdout-update/commit/2f0886b2533a312990a9c9604bd3982e8b628dd7)
-   **[Readme]** Update signature of 'update' method [`76fd194`](https://github.com/keindev/stdout-update/commit/76fd194cd8e565239425a23247937a6b340715a2)
-   **[Readme]** Add new Hook flag desc [`513844b`](https://github.com/keindev/stdout-update/commit/513844b2c865eab4d6fc4f0ae7ef2c05478d4507)
-   **[Readme]** Remove synk badge [`fac9bf6`](https://github.com/keindev/stdout-update/commit/fac9bf6cbd95171821bfb079291e8825540d53dc)
-   **[Readme]** Remove travis badge, fix usage example [`265c34a`](https://github.com/keindev/stdout-update/commit/265c34a1b1c7388612210f9a9eb4f3a0fa79dd1c)
-   **[Stream]** Fix stream mock typing [`021b499`](https://github.com/keindev/stdout-update/commit/021b499436346c43039f54cd293683c2944431c2)
-   **[Terminal]** Fix test for win32 [`105d113`](https://github.com/keindev/stdout-update/commit/105d113514d5dc8a059901e6e7941d87b4577ba7)
-   **[UpdateManager]** Add test for update with empty lines array [`6f9367c`](https://github.com/keindev/stdout-update/commit/6f9367c16e2da2f5d763b64f9e9e5dec75b3bd7b)
-   **[UpdateManager]** Fit errors with terminal height on win32 [`aaa04aa`](https://github.com/keindev/stdout-update/commit/aaa04aa4e86fcbdb50e3f3b17e7c02caf29a2435)
-   **[UpdateManager]** Fix area update test for win32 [`8fa77a9`](https://github.com/keindev/stdout-update/commit/8fa77a99cfc55d27929c0f0f0ffac531e0bb868f)
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
-   Refactor tests [`8fe72cd`](https://github.com/keindev/stdout-update/commit/8fe72cd715f3e4265f01723b690e21758e02cdf9)

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
