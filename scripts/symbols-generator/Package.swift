// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "symbols-generator",
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
        .package(url: "https://github.com/apple/swift-collections.git", .upToNextMajor(from: "1.0.0"))
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .executableTarget(
            name: "symbols-generator",
            dependencies: [
                .product(name: "OrderedCollections", package: "swift-collections")
            ],
            resources: [
                .copy("Resources")
            ]
        ),
        .testTarget(
            name: "symbols-generatorTests",
            dependencies: ["symbols-generator"]),
    ]
)
