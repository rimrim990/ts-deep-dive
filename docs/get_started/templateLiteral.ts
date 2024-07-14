/**
 * Template Literal Types
 * - using it with concrete literal types produces a new string literal types by concatenating the contents.
 */
{
    type World = "world";
    // "hello world"
    type Greeting = `hello ${World}`

    // union
    type EmailLocalIDs = "welocom_email" | "email_heading";
    type FooterLocalIDs = "footer_title" | "footer_sendoff";

    // "welcome_email_id", "email_heading_id", "footer_title_id", "footer_sendoff_id"
    type AllLocaleIDs = `${EmailLocalIDs | FooterLocalIDs}_id`

    // unions are across multiplied
    type Lang = "en" | "ja" | "pt";
    type LocalMessageIDs = `${Lang}_${AllLocaleIDs}`
}

/**
 * String Unions in Types
 * - defining a new string based on information inside a type.
 */
{
    type PropEventSource<Type> = {
        on<Key extends string & keyof Type>(eventName: `${Key}Chaned`, callback: (newValue: Type[Key]) => void): void
    }

    const passedObject = {
        firstName: "Saoirse",
        lastName: "Ronan",
        age: 26
    }

    type makeWatchedObject = <Type>(obj: Type) => Type & PropEventSource<Type>
}

/**
 * Intrinsic String Manipulation Types
 */
{
    // Converts each character in the string to the uppercase version.
    type Greeting = "Hello, world";
    // "HELLO, WORLD"
    type ShoutyGreeting = Uppercase<Greeting>;

    // Converts each character in the string to the lowercase equivalent.
    type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`
    // id-my_app
    type MainID = ASCIICacheKey<"MY_APP">

    // Converts the first character in the string to un uppercase equivalent.
    type LowercaseGreeting = "hello, world";
    // "Hello, world"
    type CapitalizedGreeting = Capitalize<LowercaseGreeting>
}