SELECT 
U.UserName AS You,
ISNULL(UR.UserName,MG.Name + ' (GROUP)') AS ExpenseFor,
E.Cost,
E.Reason AS ReasonOfExpense,
ISNULL(G.Name,MG.Name) AS WhatKindOfRelation_GROUP,
ISNULL(R.Name,'GROUP') AS RelationWithYou
FROM 
Expenses E INNER JOIN
AspNetUsers U ON E.UserId = U.Id LEFT JOIN 
AspNetUsers UR ON E.KithOrKinId = UR.Id LEFT JOIN
RelationshipUser RU ON E.KithOrKinId = RU.KithOrKinsId LEFT JOIN
Relationships R ON R.Id = RU.RelationshipsId LEFT JOIN
Groups G ON G.Id = R.GroupId LEFT JOIN
Groups MG ON MG.Id = E.GroupId
