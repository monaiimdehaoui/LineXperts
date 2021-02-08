package com.example.linexperts.Utils.Batch.CorporateGroupProcesses;

import com.example.linexperts.Models.CorporateGroup;
import com.example.linexperts.Repositories.CorporateGroupRepository;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class DBGroupWriter implements ItemWriter<CorporateGroup> {

    @Autowired
    private CorporateGroupRepository corporateGroupRepository;

    @Override
    public void write(List<? extends CorporateGroup> groupsInCSV) throws Exception
    {
        List<CorporateGroup> existingGroups =
                (List<CorporateGroup>) corporateGroupRepository.findAll();

        List<CorporateGroup> duplicateGroups = new ArrayList<>();

        for(Iterator<CorporateGroup> corporateGroupIteratorIterator = (Iterator<CorporateGroup>) groupsInCSV.iterator();
            corporateGroupIteratorIterator.hasNext();) {
            CorporateGroup cg = corporateGroupIteratorIterator.next();

            for(int i = 0; i < existingGroups.size(); i++) {

                //Record exists. Update its information
                if(cg.getGroupId().equalsIgnoreCase(existingGroups.get(i).getGroupId()))
                {
                    existingGroups.get(i).setGroupName(cg.getGroupName());
                    existingGroups.get(i).setGroupEmail(cg.getGroupEmail());
                    existingGroups.get(i).setGroupCity(cg.getGroupCity());
                    existingGroups.get(i).setGroupCountry(cg.getGroupCountry());
                    existingGroups.get(i).setGroupRegion(cg.getGroupRegion());

                    duplicateGroups.add(cg);
                    existingGroups.removeAll(duplicateGroups);
                }

                else
                {
                    existingGroups.removeAll(duplicateGroups);
                    existingGroups.add(cg);
                    break;
                }
            }
        }
        corporateGroupRepository.saveAll(existingGroups);    
    }
}
