//PASSCO SERVER README


//

 ## Server Methods
<br />
<p>/getall == RETRIEVE ALL QUESTIONS <br /></p>

<p>/insert?year&month&subject&topic&question&a1&a2&a3&a4&a5&ans == INSERT QUEsTION TO DB <br /></p>

<p>/register?fname&lname&uname&pwd&pic == ADD A USER <br /></p>

<p>/auth?uname == TO AUTHORIZE A USER <br /></p>

<p>/getUser?uname == TO RETRIEVE USER's DATA <br /></p>

/addqu?user&topic&question == FIND USER AND INSERT ANSWERED QUESTION IN ARRAY <br />

<p>/addArrayQ?user&topic&question == FIND USER AND INSERT ARRAY OF ANSWERED QUESTION IN ARRAY </p>

<p>/increasescore?user == INCREASE SCORE OF A USER BY ONE <br /></p>

<p>/returnans == RETURNS ARRAY OF ANSWERS (currently for all questions) <br /></p>

<p>/savescore?user&subject&A&B&C == SAVES SCORES FOR TESTS <br /> </p>

<p>/savesubjectscore?user&subject&score == SAVES SCORES FOR TESTS <br /> </p>

<p>/getfive?topic&subject == RETRIEVE RANDOM FIVE QUESTIONS <br /></p>

<p>/topiccompletion?topic&user == GET % of COMPLETION **INCOMPLETE**<br /> </p>

<p>/rankUsers?subject&topic == RETURN USERS RANKED <br /></p>
