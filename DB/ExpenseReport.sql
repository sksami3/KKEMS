SELECT 
U.UserName AS You,
UR.UserName AS ExpenseFor,
E.Cost,
E.Reason AS ReasonOfExpense,
G.Name AS WhatKindOfRelation,
R.Name AS RelationWithYou
FROM 
Expenses E INNER JOIN
AspNetUsers U ON E.UserId = U.Id INNER JOIN 
AspNetUsers UR ON E.KithOrKinId = UR.Id INNER JOIN
RelationshipUser RU ON E.KithOrKinId = RU.KithOrKinsId INNER JOIN
Relationships R ON R.Id = RU.RelationshipsId INNER JOIN
Groups G ON G.Id = R.GroupId
