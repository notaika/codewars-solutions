package eight_kyu;

/*Given a string, you have to return a string in which each character (case-sensitive) is repeated once.*/
public class EightKyu {
    public static void main(String[] args) {
        String newString = doubleChar("String");
        System.out.println(newString);

        String noWhiteSpace = noSpace("8 j 8   mBliB8g  imjB8B8  jl  B");
        System.out.println(noWhiteSpace);

        String playsBanjo = areYouPlayingBanjo("Martin");
        System.out.println(playsBanjo);

        int vowelCount = getCount("abracadabra");
        System.out.println(vowelCount);

        String trolledStr = disemvowel("This website is for losers LOL!");
        System.out.println(trolledStr);

        String middle = getMiddle("middle");
        System.out.println(middle);
    }
    public static String doubleChar(String s) {
        StringBuilder newStr = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            newStr.append(String.valueOf(c).repeat(2));
        }
        return newStr.toString();
    }

    public static String noSpace(final String x) {
        StringBuilder noWhiteSpace = new StringBuilder();
        for (int i = 0; i < x.length(); i++) {
            char c = x.charAt(i);
            if (!Character.isWhitespace(c)) {
                noWhiteSpace.append(c);
            }
        }
        return noWhiteSpace.toString();
    }

    public static String areYouPlayingBanjo(String name) {
        char c = name.charAt(0);
        return c == 'r' || c == 'R' ? name + " plays banjo" : name + " does not play banjo";
    }

    public static int getCount(String str) {
        String vowels = "aeiou";
        int count = 0;

        for (int i = 0; i < str.length(); i++) {
            char c = str.toLowerCase().charAt(i);
            if (vowels.indexOf(c) != -1) {
                count++;
            }
        }
        return count;
    }

    public static String disemvowel(String str) {
        StringBuilder disemvoweledStr = new StringBuilder();
        String vowels = "aeiouAEIOU";

        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (vowels.indexOf(c) == -1) {
                disemvoweledStr.append(c);
            }
        }
        return disemvoweledStr.toString();
    }

    public static String getMiddle(String word) {
        int middle = word.length() / 2;

        if (word.length() % 2 == 0) {
            return word.substring(middle - 1, middle + 1);
        } else {
            return word.substring(middle, middle + 1);
        }
    }
}


