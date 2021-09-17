# skapa-en-inloggningssida
Inlämningsuppgift

I denna applikation finns två inloggningsalternativ.
Användarna är till för att visa att välkomstsidan är 
unik för varje användare.

--Användare 1--\
Användarnamn: test\
Lösenord: 1234\
\
--Användare 2--\
Användarnamn: test2\
lösenord: 5678

Min reflektion:

I min JS-script har jag fokuserat på att arbeta med objekt. Jag skickade tidigare in en lösning på uppgiften, den lösningen var mer funktionsorienterad än denna. Jag personligen föredrar en lösning som är objektorienterad, likt denna. Koden blir mer dynamisk och hanterbar på ett mycket trevligare sätt, särskilt i ett större project. Koden känns lite mer komplex, men samtidigt så skapar den ett bra utgångsläge att utveckla vidare med.
Jag har också haft i åtanke att funktionerna ska vara återanvändbar. Objektet 'alertMsg' går till exempel att pusha vilket meddelande som helst, 'serializeObjekt()' och 'deserializeObjekt()' är inte bundet till just ett objekt från klassen 'User'. Det går alltså att omvandla andra objekt till localStorage.

Jag har gjort en demostration av vad upplägget är kapabelt till. Användaren har möjlighet att skapa ett nytt konto som lagras i local storage.

Vissa kriterier finns:\
    * Användaren ska ha mer än 4 karaktärer i namn och lösen\
    * Användaren ska använda ett namn som inte redan är taget\
    * Användaren får inte använda mellanslag i verken lösen eller namn

Jag har valt att inte göra någon styling då det var valfritt. Kalla mig lat, men skönheten ligger på insidan även här. Dessutom kommer det fler möjligheter att skryta om CSS-kunskap senare.

På återhörande,
Kim Kristiansson