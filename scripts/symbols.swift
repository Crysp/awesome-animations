import AppKit
import Foundation

enum SFFileManager {
    static func read(file name: String, withExtension ext: String? = nil) -> String? {
        guard let url = Bundle.module.url(forResource: name, withExtension: ext, subdirectory: "Resources") else {
            return nil
        }
        return try? String(contentsOf: url)
    }

    static func read(file name: String, withExtension ext: String? = nil) -> Data? {
        guard let url = Bundle.module.url(forResource: name, withExtension: ext, subdirectory: "Resources") else {
            return nil
        }
        return try? Data(contentsOf: url)
    }

    static func write(_ contents: String, to file: URL) {
        guard let data = contents.replacingOccurrences(of: "\t", with: "    ").data(using: .utf8) else {
            fatalError("Could not convert string to data")
        }
        do {
            try data.write(to: file, options: .atomic)
        } catch {
            fatalError("Could not write data to file: \(error)")
        }
    }
}

typealias SymbolManifest = [ScannedSymbol]

struct SymbolManifestParser {
    private struct Plist: Decodable {
        enum CodingKeys: String, CodingKey {
            case symbols
            case yearToReleaseMapping = "year_to_release"
        }

        var symbols: [String: String]
        var yearToReleaseMapping: [String: [String: String]]
    }

    static func parse(availabilityFileData: Data?) -> SymbolManifest? {
        guard
            let data = availabilityFileData,
            let plist = try? PropertyListDecoder().decode(Plist.self, from: data)
        else {
            return nil
        }

        var availabilityFile: SymbolManifest = []
        let availabilities = plist.yearToReleaseMapping.compactMap { key, value in
            Availability(iOS: value["iOS"]!, tvOS: value["tvOS"]!, watchOS: value["watchOS"]!, macOS: value["macOS"]!, year: key)
        }

        for (key, value) in plist.symbols.sorted(on: \.key, by: <) {
            guard let availability = (availabilities.first { $0.year == value }) else {
                // Cancel on single failure
                return nil
            }
            availabilityFile.append(ScannedSymbol(name: key, availability: availability))
        }

        // Unfortunately, the data is inconsistent and for some symbols there are conflicting availability dates
        // We just remove those symbols completely
        availabilityFile = availabilityFile.filter { scannedSymbol in
            !availabilityFile.contains { $0.name == scannedSymbol.name && $0.availability != scannedSymbol.availability }
        }
        
        return availabilityFile
    }
}

typealias SymbolNamesFile = [String]

struct SymbolNamesFileParser {
    static func parse(symbolNameFileContents: String?) -> SymbolNamesFile {
        return (symbolNameFileContents ?? "").components(separatedBy: "\n").filter { !$0.isEmpty && !$0.hasPrefix("//") }
    }
}

typealias SymbolPreviewsFile = [String]

struct SymbolPreviewsFileParser {
    static func parse(symbolFileContents: String?) -> SymbolPreviewsFile {
        return ((symbolFileContents ?? "").components(separatedBy: "\n").last { !$0.isEmpty } ?? "").map { String($0) }.filter { !$0.isEmpty }
    }
}

struct SymbolRestrictionsParser {
    static func parse(from data: Data?) -> [String: String]? {
        guard let data = data else { return nil }
        return try? PropertyListDecoder().decode([String: String].self, from: data)
    }
}

typealias LayersetAvailabilitiesList = [String: [LayersetAvailability]]

struct LayersetAvailabilityParser {
    private struct Plist: Decodable {
        enum CodingKeys: String, CodingKey {
            case symbols
            case yearToReleaseMapping = "year_to_release"
        }

        var symbols: [String: [String: String]]
        var yearToReleaseMapping: [String: [String: String]]
    }

    static func parse(layersetAvailabilityFileData: Data?) -> LayersetAvailabilitiesList? {
        guard
            let data = layersetAvailabilityFileData,
            let plist = try? PropertyListDecoder().decode(Plist.self, from: data)
        else {
            return nil
        }

        var layersetAvailabilitiesList: LayersetAvailabilitiesList = [:]
        let availabilities = plist.yearToReleaseMapping.compactMap { key, value in
            Availability(iOS: value["iOS"]!, tvOS: value["tvOS"]!, watchOS: value["watchOS"]!, macOS: value["macOS"]!, year: key)
        }

        for (key, value) in plist.symbols.sorted(on: \.key, by: <) {
            var layerSetAvailabilities = [LayersetAvailability]()

            for (layerset, year) in value {
                guard let availability = (availabilities.first { $0.year == year }) else {
                    // Cancel on single failure
                    return nil
                }

                layerSetAvailabilities.append(LayersetAvailability(name: layerset, availability: availability))
            }

            layersetAvailabilitiesList[key] = layerSetAvailabilities
        }

        return layersetAvailabilitiesList
    }
}

import OrderedCollections

typealias StringDictionary = OrderedDictionary<String, String>

struct StringDictionaryFileParser {
    static func parse(from data: Data?) -> StringDictionary? {
        guard let data = data,
                let unorderedDict = try? PropertyListDecoder().decode([String: String].self, from: data)
        else { return nil }
        return .init(uncheckedUniqueKeysWithValues: unorderedDict.sorted(on: \.key, by: <))
    }
}

extension Collection {
    var isNotEmpty: Bool { !isEmpty }
}

extension Sequence {
    func sorted<T>(on element: (Element) -> T,
                   by areInIncreasingOrder: (T, T) -> Bool) -> [Element] {
        return sorted { areInIncreasingOrder(element($0), element($1)) }
    }
}

infix operator ×
internal func ×<A, B>(lhs: [A], rhs: [B]) -> [(A, B)] {
    var result = [(A, B)]()
    for a in lhs {
        for b in rhs {
            result.append((a, b))
        }
    }
    return result
}

extension String {
    var toPropertyName: String {
        // Handle special swift keywords
        guard self != "return" else { return "`return`" }
        guard self != "repeat" else { return "`repeat`" }
        guard self != "case" else { return "`case`" }

        // Perform naming style transformation
        var outputString = ""
        var shouldCapitalizeNextChar = false

        // Avoid non-compiling leading numbers by prefixing with _
        if first?.isNumber == true {
            outputString += "_"
        }

        for char in self {
            if char == "." {
                shouldCapitalizeNextChar = true
            } else {
                if shouldCapitalizeNextChar {
                    outputString += char.uppercased()
                } else {
                    outputString += char.lowercased()
                }

                shouldCapitalizeNextChar = false
            }
        }

        return outputString
    }
}

// MARK: - Step 1: READ INPUT FILES
guard
    let symbolManifest = SFFileManager
        .read(file: "name_availability", withExtension: "plist")
        .flatMap(SymbolManifestParser.parse),
    let layerSetAvailabilitiesList = SFFileManager
        .read(file: "layerset_availability", withExtension: "plist")
        .flatMap(LayersetAvailabilityParser.parse),
    var nameAliases = SFFileManager
        .read(file: "name_aliases_strings", withExtension: "txt")
        .flatMap(StringDictionaryFileParser.parse)?
        .map({ (oldName: $0.key, newName: $0.value) }),
    let legacyAliases = SFFileManager
        .read(file: "legacy_aliases_strings", withExtension: "txt")
        .flatMap(StringDictionaryFileParser.parse)?
        .map({ (legacyName: $0.key, releasedName: $0.value) }),
    var symbolRestrictions = SFFileManager
        .read(file: "symbol_restrictions", withExtension: "strings")
        .flatMap(StringDictionaryFileParser.parse),
    let missingSymbolRestrictions = SFFileManager
        .read(file: "symbol_restrictions_missing", withExtension: "strings")
        .flatMap(StringDictionaryFileParser.parse),
    let symbolNames = SFFileManager
        .read(file: "symbol_names", withExtension: "txt")
        .flatMap(SymbolNamesFileParser.parse),
    let symbolPreviews = SFFileManager
        .read(file: "symbol_previews", withExtension: "txt")
        .flatMap(SymbolPreviewsFileParser.parse)
else {
    fatalError("Error reading input files")
}

guard CommandLine.argc > 1 else {
    fatalError("Invalid output Directory")
}
